// Initialize Feather icons
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    initializeApp();
});

// Main application logic
function initializeApp() {
    // DOM elements
    const heartRateEl = document.getElementById('heart-rate');
    const breathingRateEl = document.getElementById('breathing-rate');
    const lastUpdateEl = document.getElementById('last-update');
    const errorMessageEl = document.getElementById('error-message');
    const updateBtn = document.getElementById('update-btn');
    const playBtn = document.getElementById('play-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const statusMessageEl = document.getElementById('status-message');
    const midiDevicesContainer = document.getElementById('midi-devices-container');
    const midiNoteSelect = document.getElementById('midi-note');
    const autoUpdateCheckbox = document.getElementById('auto-update');
    const updateIntervalSelect = document.getElementById('update-interval');
    const pitchRangeSlider = document.getElementById('pitch-range-slider');

    // Chart setup
    const ctx = document.getElementById('heart-rate-chart').getContext('2d');
    const heartRateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Heart Rate (BPM)',
                data: [],
                borderColor: '#ef4444', // Red-500
                backgroundColor: 'rgba(239, 68, 68, 0.1)', // Red-500 with transparency
                tension: 0.2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 50,
                    suggestedMax: 100
                }
            }
        }
    });

    // Breathing rate chart setup
    const breathingCtx = document.getElementById('breathing-rate-chart').getContext('2d');
    const breathingRateChart = new Chart(breathingCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Breathing Rate (breaths/min)',
                data: [],
                borderColor: '#ffc60a', // Yellow custom color
                backgroundColor: 'rgba(255, 198, 10, 0.1)', // Yellow with transparency
                tension: 0.2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 5,
                    suggestedMax: 20
                }
            }
        }
    });

    // Application state
    let heartRate = null;
    let breathingRate = null;
    let isPlaying = false;
    let audioContext = null;
    let nextNoteTime = 0;
    let timerID = null;
    let midiOutputs = [];
    let selectedMidiOutput = null;
    let usingMIDI = false;
    let volume = 0.5;
    let midiNote = 60; // Middle C
    let pitchRange = 12; // Default range for pitch modulation (in semitones)
    let heartRateHistory = [];
    let breathingRateHistory = [];
    let autoUpdateInterval = null;
    
    // Interpolation state
    let currentHeartRate = null;
    let targetHeartRate = null;
    let currentBreathingRate = null;
    let targetBreathingRate = null;
    let interpolationInterval = null;
    
    // Set auto-update to true by default
    autoUpdateCheckbox.checked = true;

    // Initialize audio and MIDI
    async function initAudio() {
        try {
            // Initialize Web Audio API
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();

            // Check for MIDI support
            if (navigator.requestMIDIAccess) {
                try {
                    console.log("Requesting MIDI access...");
                    const midiAccess = await navigator.requestMIDIAccess({ sysex: false });
                    console.log("MIDI access granted:", midiAccess);
                    
                    midiOutputs = Array.from(midiAccess.outputs.values());
                    console.log("Available MIDI outputs:", midiOutputs);

                    updateMIDIDevicesList();

                    // Listen for MIDI connection changes
                    midiAccess.onstatechange = (event) => {
                        console.log("MIDI state change:", event.port.name, event.port.state);
                        updateMIDIDevicesList();
                    };

                    if (midiOutputs.length > 0) {
                        // Auto-select first device
                        selectedMidiOutput = midiOutputs[0];
                        usingMIDI = true;
                        
                        console.log("Selected MIDI output:", selectedMidiOutput.name);
                        updateStatus(`MIDI connected: ${selectedMidiOutput.name}`);
                        
                        // Test MIDI connection with a quick note
                        testMIDIOutput();
                    } else {
                        console.log("No MIDI outputs found");
                        updateStatus('No MIDI outputs found. Using audio.');
                    }
                } catch (err) {
                    console.error('MIDI access failed:', err);
                    updateStatus('MIDI access failed. Using audio.');
                }
            } else {
                console.log("Web MIDI API not supported in this browser");
                updateStatus('Web MIDI not supported in this browser. Using audio.');
            }
        } catch (err) {
            console.error('Audio initialization failed:', err);
            showError('Failed to initialize audio: ' + err.message);
        }
    }

    // Function to test MIDI output with a single note
    function testMIDIOutput() {
        if (!selectedMidiOutput) return;
        
        console.log("Testing MIDI output with a C4 note");
        
        // Send note on - channel 1 (0x90), note 60 (C4), velocity 100
        selectedMidiOutput.send([0x90, 60, 100]);
        
        // Schedule note off after 500ms
        setTimeout(() => {
            selectedMidiOutput.send([0x80, 60, 0]);
            console.log("Test note complete");
        }, 500);
    }

    // Update MIDI devices list
    function updateMIDIDevicesList() {
        // Clear current list
        midiDevicesContainer.innerHTML = '';

        if (midiOutputs.length === 0) {
            midiDevicesContainer.innerHTML = '<div class="p-3 text-sm text-gray-500">No MIDI devices found</div>';
            return;
        }

        // Add each MIDI device as an option
        midiOutputs.forEach(device => {
            const deviceEl = document.createElement('div');
            deviceEl.className = `midi-device p-3 cursor-pointer ${selectedMidiOutput && selectedMidiOutput.id === device.id ? 'selected' : ''}`;
            deviceEl.textContent = device.name || `MIDI Output (${device.id})`;
            deviceEl.dataset.deviceId = device.id;

            deviceEl.addEventListener('click', () => {
                // Update selected device
                selectedMidiOutput = device;
                usingMIDI = true;
                console.log("Selected MIDI device:", device.name);
                updateStatus(`MIDI output selected: ${device.name}`);

                // Update UI to show selection
                document.querySelectorAll('.midi-device').forEach(el => {
                    el.classList.remove('selected');
                });
                deviceEl.classList.add('selected');
                
                // Test the selected MIDI device
                testMIDIOutput();
            });

            midiDevicesContainer.appendChild(deviceEl);
        });
    }

    // Fetch heart rate from Adafruit IO (public feed)
    async function fetchHeartRate() {
        try {
            hideError();
            
            // Using the feed endpoint
            const url = `https://io.adafruit.com/api/v2/Dr_Ew/feeds/heart-rate`;
            
            console.log('Fetching heart rate from:', url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Adafruit IO returned status code: ${response.status}`);
            }
            
            // This will get the feed info first
            const feedInfo = await response.json();
            console.log('Feed info:', feedInfo);
            
            // Then we'll try to get the latest value
            if (feedInfo && feedInfo.last_value) {
                heartRate = parseFloat(feedInfo.last_value);
                const timestamp = new Date().toLocaleTimeString();

                // Update display
                heartRateEl.textContent = `${heartRate} BPM`;
                lastUpdateEl.textContent = `Last updated: ${timestamp}`;
                
                if (!isPlaying) {
                    updateStatus(`Heart rate: ${heartRate} BPM` + (breathingRate ? `, Breathing rate: ${breathingRate.toFixed(1)} breaths/min` : ''));
                }

                // Set target for interpolation
                targetHeartRate = heartRate;
                
                // If not playing yet, also set current rate
                if (currentHeartRate === null) {
                    currentHeartRate = heartRate;
                }

                // Add to history and update chart
                updateHeartRateHistory(heartRate, timestamp);

                return heartRate;
            } else {
                throw new Error('Could not find the last_value in the feed info');
            }
        } catch (error) {
            showError(`Error fetching heart rate: ${error.message}`);
            console.error('Error fetching heart rate:', error);
            return null;
        }
    }

    // Fetch breathing rate from Adafruit IO (public feed)
    async function fetchBreathingRate() {
        try {
            hideError();
            
            // Using the feed endpoint
            const url = `https://io.adafruit.com/api/v2/Dr_Ew/feeds/breathing-rate`;
            
            console.log('Fetching breathing rate from:', url);
            const response = await fetch(url);

            if (!response.ok) {
                console.error('Error response:', response.status, response.statusText);
                throw new Error(`Adafruit IO returned status code: ${response.status}`);
            }
            
            // This will get the feed info first
            const feedInfo = await response.json();
            console.log('Breathing feed info:', feedInfo);
            
            // Then we'll extract the latest value
            if (feedInfo && feedInfo.last_value) {
                breathingRate = parseFloat(feedInfo.last_value);
                const timestamp = new Date().toLocaleTimeString();

                // Update display
                breathingRateEl.textContent = `${breathingRate.toFixed(1)} breaths/min`;
                
                if (!isPlaying) {
                    updateStatus(`Heart rate: ${heartRate || '--'} BPM, Breathing rate: ${breathingRate.toFixed(1)} breaths/min`);
                }

                // Set target for interpolation
                targetBreathingRate = breathingRate;
                
                // If not playing yet, also set current rate
                if (currentBreathingRate === null) {
                    currentBreathingRate = breathingRate;
                }

                // Add to history and update chart
                updateBreathingRateHistory(breathingRate, timestamp);

                return breathingRate;
            } else {
                throw new Error('Could not find the last_value in the feed info');
            }
        } catch (error) {
            showError(`Error fetching breathing rate: ${error.message}`);
            console.error('Error fetching breathing rate:', error);
            return null;
        }
    }

    // Fetch heart rate history from Adafruit IO (public feed)
    async function fetchHeartRateHistory() {
        try {
            // Use the data endpoint for history
            const url = `https://io.adafruit.com/api/v2/Dr_Ew/feeds/heart-rate/data?limit=10`;
            
            console.log('Fetching heart rate history from:', url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Adafruit IO returned status code: ${response.status}`);
            }

            const data = await response.json();

            // Process and format the data
            heartRateHistory = [];
            
            for (const entry of data) {
                const created = new Date(entry.created_at);
                heartRateHistory.push({
                    rate: parseFloat(entry.value),
                    timestamp: created.toLocaleTimeString()
                });
            }

            // Reverse to chronological order
            heartRateHistory.reverse();

            // Update chart
            updateChartWithHistory();

        } catch (error) {
            console.error('Error fetching heart rate history:', error);
        }
    }

    // Fetch breathing rate history from Adafruit IO (public feed)
    async function fetchBreathingRateHistory() {
        try {
            // Use the data endpoint for history
            const url = `https://io.adafruit.com/api/v2/Dr_Ew/feeds/breathing-rate/data?limit=10`;
            
            console.log('Fetching breathing rate history from:', url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Adafruit IO returned status code: ${response.status}`);
            }

            const data = await response.json();

            // Process and format the data
            breathingRateHistory = [];
            
            for (const entry of data) {
                const created = new Date(entry.created_at);
                breathingRateHistory.push({
                    rate: parseFloat(entry.value),
                    timestamp: created.toLocaleTimeString()
                });
            }

            // Reverse to chronological order
            breathingRateHistory.reverse();

            // Update chart
            updateBreathingChartWithHistory();

        } catch (error) {
            console.error('Error fetching breathing rate history:', error);
        }
    }

    // Update heart rate history and chart
    function updateHeartRateHistory(rate, timestamp) {
        // Add to history array (limit to 10 entries)
        heartRateHistory.push({
            rate: rate,
            timestamp: timestamp
        });

        if (heartRateHistory.length > 10) {
            heartRateHistory.shift();
        }

        updateChartWithHistory();
    }

    // Update breathing rate history and chart
    function updateBreathingRateHistory(rate, timestamp) {
        // Add to history array (limit to 10 entries)
        breathingRateHistory.push({
            rate: rate,
            timestamp: timestamp
        });

        if (breathingRateHistory.length > 10) {
            breathingRateHistory.shift();
        }

        updateBreathingChartWithHistory();
    }

    // Update heart rate chart with current history
    function updateChartWithHistory() {
        // Update chart
        heartRateChart.data.labels = heartRateHistory.map(item => item.timestamp);
        heartRateChart.data.datasets[0].data = heartRateHistory.map(item => item.rate);

        // Adjust y-axis if needed
        const values = heartRateHistory.map(item => item.rate);
        if (values.length > 0) {
            const min = Math.min(...values);
            const max = Math.max(...values);
            const padding = Math.max(5, Math.round((max - min) * 0.1));

            heartRateChart.options.scales.y.suggestedMin = Math.max(40, min - padding);
            heartRateChart.options.scales.y.suggestedMax = max + padding;
        }

        heartRateChart.update();
    }

    // Update breathing rate chart with current history
    function updateBreathingChartWithHistory() {
        // Update chart
        breathingRateChart.data.labels = breathingRateHistory.map(item => item.timestamp);
        breathingRateChart.data.datasets[0].data = breathingRateHistory.map(item => item.rate);

        // Adjust y-axis if needed
        const values = breathingRateHistory.map(item => item.rate);
        if (values.length > 0) {
            const min = Math.min(...values);
            const max = Math.max(...values);
            const padding = Math.max(1, Math.round((max - min) * 0.1));

            breathingRateChart.options.scales.y.suggestedMin = Math.max(5, min - padding);
            breathingRateChart.options.scales.y.suggestedMax = max + padding;
        }

        breathingRateChart.update();
    }

    // Update interpolation values
    function updateInterpolation() {
        // If not playing, don't interpolate
        if (!isPlaying) return;

        // Interpolate heart rate
        if (currentHeartRate !== null && targetHeartRate !== null) {
            if (Math.abs(currentHeartRate - targetHeartRate) < 0.1) {
                currentHeartRate = targetHeartRate;
            } else {
                // Smooth interpolation - move 10% of the way to the target each step
                currentHeartRate += (targetHeartRate - currentHeartRate) * 0.1;
            }
        }

        // Interpolate breathing rate
        if (currentBreathingRate !== null && targetBreathingRate !== null) {
            if (Math.abs(currentBreathingRate - targetBreathingRate) < 0.1) {
                currentBreathingRate = targetBreathingRate;
            } else {
                // Smooth interpolation - move 10% of the way to the target each step
                currentBreathingRate += (targetBreathingRate - currentBreathingRate) * 0.1;
            }
        }
        
        // Update status with current values during playback
        if (isPlaying && currentHeartRate && currentBreathingRate) {
            updateStatus(`Playing: tempo ${Math.round(currentHeartRate)} BPM, pitch offset based on breathing rate (${currentBreathingRate.toFixed(1)} breaths/min)`);
        }
    }

    // Schedule a note to play
    function scheduleNote(time) {
        // Calculate pitch offset based on breathing rate
        // Default MIDI note is the base, breathing rate affects pitch
        let noteValue = parseInt(midiNoteSelect.value);
        let pitchOffset = 0;
        
        if (currentBreathingRate !== null) {
            // Map breathing rate to a pitch range
            // Assuming normal breathing rate is around 12-16 breaths/min
            // We'll center the pitch at 14 breaths/min
            const normalBreathingRate = 14;
            const maxPitchChange = pitchRange / 2; // half the range in each direction
            
            // Calculate pitch offset (in semitones)
            pitchOffset = ((currentBreathingRate - normalBreathingRate) / normalBreathingRate) * maxPitchChange;
            
            // Limit to the range
            pitchOffset = Math.max(-maxPitchChange, Math.min(maxPitchChange, pitchOffset));
        }

        // Apply the pitch offset (may be fractional for microtonal changes)
        const adjustedNote = noteValue + pitchOffset;

        if (usingMIDI && selectedMidiOutput) {
            // For MIDI, we need to round to the nearest semitone
            const roundedNote = Math.round(adjustedNote);
            
            // Ensure note is within MIDI range (0-127)
            const safeNote = Math.max(0, Math.min(127, roundedNote));
            
            console.log(`Playing MIDI note: ${safeNote} (base: ${noteValue}, offset: ${pitchOffset.toFixed(2)})`);
            
            try {
                // Send MIDI note on (channel 1, selected note, velocity 100)
                selectedMidiOutput.send([0x90, safeNote, 100], audioContext.currentTime * 1000);
    
                // Schedule note off after 100ms
                setTimeout(() => {
                    try {
                        selectedMidiOutput.send([0x80, safeNote, 0]);
                    } catch (err) {
                        console.error("Error sending MIDI note off:", err);
                    }
                }, 100);
            } catch (err) {
                console.error("Error sending MIDI note on:", err);
                
                // If MIDI fails, fall back to audio
                playAudioNote(adjustedNote, time);
            }
        } else if (audioContext) {
            playAudioNote(adjustedNote, time);
        }
    }
    
    // Play a note using Web Audio API
    function playAudioNote(note, time) {
        // Create oscillator for audio click
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        // Map MIDI note to frequency (simple formula: 440 * 2^((note-69)/12))
        // We can use the exact fractional note value for more precise pitch
        const frequency = 440 * Math.pow(2, (note - 69) / 12);
        osc.frequency.value = frequency;
        gainNode.gain.value = volume;

        osc.connect(gainNode);
        gainNode.connect(audioContext.destination);

        osc.start(time);
        osc.stop(time + 0.1);
    }

    // Scheduler function for timing
    function scheduler() {
        if (!isPlaying) return;
        
        // If neither heart rate nor breathing rate is available, don't proceed
        if (currentHeartRate === null) return;

        const secondsPerBeat = 60.0 / currentHeartRate;
        const currentTime = audioContext.currentTime;

        // Schedule notes until we're 100ms ahead
        while (nextNoteTime < currentTime + 0.1) {
            scheduleNote(nextNoteTime);
            nextNoteTime += secondsPerBeat;
        }

        // Call scheduler again in 25ms
        timerID = setTimeout(scheduler, 25);
    }

    // Toggle play/pause
    async function togglePlayback() {
        if (!isPlaying) {
            // Start playing
            if (audioContext && audioContext.state === 'suspended') {
                await audioContext.resume();
            }

            // Get current rates if we don't have them
            if (!heartRate) {
                const rate = await fetchHeartRate();
                if (!rate) return; // Don't start if we can't get heart rate
            }
            
            if (!breathingRate) {
                await fetchBreathingRate();
                // We can proceed without breathing rate, it will just affect pitch
            }

            // Set up initial interpolation values
            currentHeartRate = heartRate;
            targetHeartRate = heartRate;
            currentBreathingRate = breathingRate;
            targetBreathingRate = breathingRate;

            // Start interpolation
            interpolationInterval = setInterval(updateInterpolation, 50); // Update 20 times per second

            // Reset timing
            nextNoteTime = audioContext.currentTime;

            // Update UI
            isPlaying = true;
            playBtn.innerHTML = '<i data-feather="pause" class="mr-2"></i> Stop';
            playBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            playBtn.classList.add('bg-red-500', 'hover:bg-red-600');
            feather.replace();
            
            // Update status for playing mode
            updateStatus(`Playing: tempo ${Math.round(currentHeartRate)} BPM, pitch based on breathing rate`);

            // Start scheduler
            scheduler();

            // Set up interval to update rates if auto-update is enabled
            if (autoUpdateCheckbox.checked) {
                startAutoUpdate();
            }
        } else {
            // Stop playing
            isPlaying = false;
            if (timerID) {
                clearTimeout(timerID);
                timerID = null;
            }
            
            // Stop interpolation
            if (interpolationInterval) {
                clearInterval(interpolationInterval);
                interpolationInterval = null;
            }

            // Update UI
            playBtn.innerHTML = '<i data-feather="play" class="mr-2"></i> Play';
            playBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
            playBtn.classList.add('bg-green-500', 'hover:bg-green-600');
            feather.replace();
            
            // Update status back to non-playing state
            if (heartRate && breathingRate) {
                updateStatus(`Heart rate: ${heartRate} BPM, Breathing rate: ${breathingRate.toFixed(1)} breaths/min`);
            } else {
                updateStatus('Ready to play');
            }
        }
    }

    // Auto update functions
    function startAutoUpdate() {
        // Clear any existing interval
        if (autoUpdateInterval) {
            clearInterval(autoUpdateInterval);
        }

        // Get interval in seconds
        const intervalSeconds = parseInt(updateIntervalSelect.value);

        // Start new interval for both heart and breathing rate
        fetchHeartRate(); // Fetch heart rate immediately
        fetchBreathingRate(); // Fetch breathing rate immediately
        
        autoUpdateInterval = setInterval(() => {
            fetchHeartRate();
            fetchBreathingRate();
        }, intervalSeconds * 1000);
    }

    function stopAutoUpdate() {
        if (autoUpdateInterval) {
            clearInterval(autoUpdateInterval);
            autoUpdateInterval = null;
        }
    }

    // Helper functions
    function showError(message) {
        errorMessageEl.textContent = message;
        errorMessageEl.classList.remove('hidden');
    }

    function hideError() {
        errorMessageEl.classList.add('hidden');
    }

    function updateStatus(message) {
        statusMessageEl.textContent = `Status: ${message}`;
    }

    // Event listeners
    updateBtn.addEventListener('click', () => {
        fetchHeartRate();
        fetchBreathingRate();
    });
    
    playBtn.addEventListener('click', togglePlayback);

    volumeSlider.addEventListener('input', function(e) {
        volume = parseFloat(e.target.value);
    });

    pitchRangeSlider.addEventListener('input', function(e) {
        pitchRange = parseInt(e.target.value);
    });

    autoUpdateCheckbox.addEventListener('change', function() {
        if (this.checked) {
            startAutoUpdate();
        } else {
            stopAutoUpdate();
        }
    });

    updateIntervalSelect.addEventListener('change', function() {
        if (autoUpdateCheckbox.checked) {
            // Restart with new interval
            startAutoUpdate();
        }
    });

    midiNoteSelect.addEventListener('change', function() {
        midiNote = parseInt(this.value);
    });

    // Initialize
    initAudio();
    
    // Start auto-update (enabled by default)
    if (autoUpdateCheckbox.checked) {
        startAutoUpdate();
    } else {
        // Initial data fetch
        fetchHeartRate();
        fetchHeartRateHistory();
        fetchBreathingRate();
        fetchBreathingRateHistory();
    }
}