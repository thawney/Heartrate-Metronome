// Pre-recorded biometric data
const prerecordedData = {
    loop1: {
        heart_rate: [98,85,88,88,83,83,83,83,83,83,83,83,83,83,83,76,74,83,83,85,84,84,72,65,60,56,56,74,87,83,85,85,85,85,84,84,92,97,95,78,68,66,74,75,89,88,81,86,89,89,89,89,89,89,81,71,67,63,72,84,83,79,77,67,75,75,77,75,72,68,79,84,88,89,79,79,79,79,75,76,75,79,77,77,72,76,74,85,88,90,86,88,80,74,70,70,70,78,81,83,87,94,95,67],
        breathing_rate: [18,16,20,20,14,14,14,14,14,14,14,14,16,16,21,28,30,25,26,13,16,19,17,9,17,22,32,32,17,21,22,22,10,11,26,22,23,22,12,12,20,16,16,16,22,21,21,17,18,19,19,21,21,21,20,17,25,23,16,21,22,21,21,19,2,13,20,15,15,23,26,18,14,26,19,12,9,28,20,23,21,11,12,18,22,26,28,28,27,14,18,25,25,14,11,18,17,25,27,21,18,29,19,26]
    },
    loop2: {
        heart_rate: [91,92,92,92,92,91,66,59,55,53,53,54,57,57,57,57,57,57,57,58,58,58,56,56,56,58,58,72,64,60,56,59,57,56,56,64,60,60,60,60,62,65,70,71,67,62,58,57,59,58,61,58,58,58,58,68,73,68,63,63,67,76,81,88,95,86,79,80,78,77,73,75,75,68,74,78,82,83,81,77,68,74,81,84,84,82,81,81,85,85,90,90,88,78,72,65,70,72,72,72,68,72,76,78],
        breathing_rate: [23,24,22,22,27,19,19,25,23,21,21,19,19,21,21,21,21,19,19,21,21,19,21,22,19,21,21,23,16,21,21,19,21,23,21,21,23,21,21,21,21,20,24,18,21,21,21,20,26,24,20,17,19,22,13,21,21,21,21,23,25,21,18,16,15,16,18,20,11,13,22,21,21,21,21,19,27,23,18,19,23,12,12,10,10,11,21,23,13,13,28,25,18,17,16,17,21,17,14,19,19,17,17,19]
    },
    loop3: {
        heart_rate: [79,79,79,93,93,93,97,97,78,78,63,63,82,82,82,90,90,86,86,81,81,69,69,69,63,63,64,64,72,72,81,81,81,79,79,68,68,84,84,96,96,96,98,98,85,85,72,72,61,61,61,68,68,65,65,65,65,83,83,72,72,72,71,71,94,94,83,83,94,94,94,88,88,61,61,63,63,71,71,74,74,74,65,65,55,55,58,58,65,65,65,58,58,63,63,92,92,92,92,92,95,95,99,99,89,89,66,66,66,56,56,56,56,62,62,76,76,64,64,64,56,56,51,51,74,74,68,68,68,65,65,67,67,67,67,70,70,70,63,63,75,75,85,85,82,82,75,75,75,75,75,69,69,66,66,77,77,77,62,62,60,60,64,64,64,64,64,67,67,59,59,62,62,78,78,85,85,85,88,88,93,93,80,80,60,60,60,81,81,77,77,69,69,67,67,67,67,67,71,71,75,75,80,80,80,74,74,82,82,91,91,85,85,66,66,66,60,60,71,71,92,88,88,94,94,94,96,96,96],
        breathing_rate: [21,12,12,18,18,18,16,16,14,14,17,17,12,12,12,14,14,12,12,14,14,26,26,26,17,17,24,24,23,23,14,14,14,26,26,15,15,16,16,17,17,22,22,22,16,16,20,20,23,23,16,16,16,12,12,13,13,19,19,16,16,16,25,25,12,12,16,16,18,18,16,16,16,21,21,14,14,18,18,16,16,16,11,11,22,22,17,17,16,16,16,14,14,14,14,26,26,20,20,20,19,19,13,13,16,16,15,15,15,15,15,17,17,12,12,24,24,10,10,10,18,18,11,11,18,18,14,14,14,10,10,12,12,17,17,14,14,17,17,17,18,18,24,24,14,14,22,22,22,21,21,21,21,18,18,17,17,17,15,15,14,14,17,17,12,12,24,24,24,9,9,14,14,12,12,20,20,20,17,17,16,16,15,15,13,13,13,12,12,19,19,20,20,13,13,13,16,16]
    },
    loop4: {
        heart_rate: [88,88,83,83,94,94,76,65,65,63,63,67,67,67,67,69,73,73,83,83,86,86,84,75,75,70,70,90,90,96,96,96,104,104,90,90,74,74,60,65,65,73,73,80,80,83,92,92,92,92,95,95,86,85,85,86,86,85,85,66,66,81,88,88,81,81,77,77,73,82,82,85,85,77,77,79,79,82,80,80,72,72,72,72,72,70,70,56,56,63,63,62,65,65,68,68,71,71,74,85,85,83,83,90,90,80,79,79,80,80,98,98,83,65,65,65,65,77,77,81,81,92,83,83,82,82,72,72,74,83,83,86,86,84,84,78,77,77,62,62,53,53,53,53,64,80,80,82,82,82,82,81,79,79,78,78,67,67,76,65,65,73,73,94,94,99,99,87,79,79,75,75,84,84,82,82,82,74,74,75,75,78,69,69,73,73,74,74,72,72,67,88,88,98,98,99,99,73,63,63,60,60,69,69,84,92],
        breathing_rate: [21,21,16,16,17,17,9,23,23,28,28,24,24,19,19,12,14,14,11,11,15,15,22,20,20,12,12,14,14,28,20,20,16,16,16,16,14,19,19,27,27,20,20,27,27,28,19,19,17,17,17,17,17,18,18,17,17,12,12,14,14,12,23,23,23,23,19,19,16,22,22,14,14,20,20,24,28,28,25,25,23,23,11,11,15,19,19,18,18,14,14,17,19,19,21,21,23,23,19,22,22,20,20,10,10,24,17,17,16,16,24,24,14,20,20,19,19,13,13,19,21,21,21,21,20,20,22,22,20,19,19,19,19,17,17,19,26,26,24,24,24,24,22,20,20,21,21,12,12,18,18,19,16,16,17,17,19,19,18,19,19,21,21,17,17,14,26,26,13,13,16,16,14,14,17,22,22,22,22,15,15,19,25,25,27,27,28,28,22,19,19,16,16,21,21,14,14,23,22,22,21,21,21,21,25,21]
    }
};

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

    // Mode switching elements
    const singleModeBtn = document.getElementById('single-mode-btn');
    const fiveBeatModeBtn = document.getElementById('five-beat-mode-btn');
    const singleModeContent = document.getElementById('single-mode-content');
    const fiveBeatModeContent = document.getElementById('five-beat-mode-content');
    const singleModeInstructions = document.getElementById('single-mode-instructions');
    const fiveBeatInstructions = document.getElementById('five-beat-instructions');

    // 5-Beat mode elements (removed data source selection)
    // const dataSourceSelect = document.getElementById('data-source-select');
    // const loopOffsetSlider = document.getElementById('loop-offset');
    // const offsetValueDisplay = document.getElementById('offset-value');

    // Chart setup
    const ctx = document.getElementById('heart-rate-chart').getContext('2d');
    const heartRateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Heart Rate (BPM)',
                data: [],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 50,
                    suggestedMax: 100
                }
            }
        }
    });

    const breathingCtx = document.getElementById('breathing-rate-chart').getContext('2d');
    const breathingRateChart = new Chart(breathingCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Breathing Rate (breaths/min)',
                data: [],
                borderColor: '#ffc60a',
                backgroundColor: 'rgba(255, 198, 10, 0.1)',
                tension: 0.2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
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
    let currentMode = 'single'; // 'single' or 'fivebeat'
    let heartRate = null;
    let breathingRate = null;
    let isPlaying = false;
    let audioContext = null;
    let midiOutputs = [];
    let selectedMidiOutput = null;
    let usingMIDI = false;
    let volume = 0.5;
    let midiNote = 60;
    let pitchRange = 12;
    let heartRateHistory = [];
    let breathingRateHistory = [];
    let autoUpdateInterval = null;
    
    // Single mode interpolation state
    let currentHeartRate = null;
    let targetHeartRate = null;
    let currentBreathingRate = null;
    let targetBreathingRate = null;
    let nextNoteTime = 0;
    
    // 5-Beat mode state
    let channels = [
        { id: 1, heartRate: null, breathingRate: null, currentHeartRate: null, targetHeartRate: null, currentBreathingRate: null, targetBreathingRate: null, nextNoteTime: 0, timerID: null, enabled: true, midiChannel: 0 },
        { id: 2, heartRate: null, breathingRate: null, currentHeartRate: null, targetHeartRate: null, currentBreathingRate: null, targetBreathingRate: null, nextNoteTime: 0, timerID: null, enabled: true, midiChannel: 1 },
        { id: 3, heartRate: null, breathingRate: null, currentHeartRate: null, targetHeartRate: null, currentBreathingRate: null, targetBreathingRate: null, nextNoteTime: 0, timerID: null, enabled: true, midiChannel: 2 },
        { id: 4, heartRate: null, breathingRate: null, currentHeartRate: null, targetHeartRate: null, currentBreathingRate: null, targetBreathingRate: null, nextNoteTime: 0, timerID: null, enabled: true, midiChannel: 3 },
        { id: 5, heartRate: null, breathingRate: null, currentHeartRate: null, targetHeartRate: null, currentBreathingRate: null, targetBreathingRate: null, nextNoteTime: 0, timerID: null, enabled: true, midiChannel: 4 }
    ];
    
    // Remove the old updatePreRecordedChannels function - no longer needed

    // Initialize loop indices with random starting points for variation
    let loopIndices = { 
        loop1: Math.floor(Math.random() * prerecordedData.loop1.heart_rate.length), 
        loop2: Math.floor(Math.random() * prerecordedData.loop2.heart_rate.length), 
        loop3: Math.floor(Math.random() * prerecordedData.loop3.heart_rate.length), 
        loop4: Math.floor(Math.random() * prerecordedData.loop4.heart_rate.length) 
    };
    let interpolationInterval = null;

    // Set auto-update to true by default
    autoUpdateCheckbox.checked = true;

    // Available loops for random selection
    const availableLoops = ['loop1', 'loop2', 'loop3', 'loop4'];
    
    // Function to randomly assign a new loop to a channel
    function assignRandomLoop(channelIndex) {
        const randomLoopName = availableLoops[Math.floor(Math.random() * availableLoops.length)];
        channels[channelIndex].currentLoop = randomLoopName;
        channels[channelIndex].loopIndex = Math.floor(Math.random() * prerecordedData[randomLoopName].heart_rate.length);
        console.log(`Channel ${channelIndex + 1} assigned to ${randomLoopName} starting at index ${channels[channelIndex].loopIndex}`);
        return randomLoopName;
    }

    // Mode switching - FIXED: Proper event handling and CSS classes
    function switchToSingleMode() {
        currentMode = 'single';
        singleModeBtn.classList.add('bg-white', 'shadow-sm');
        singleModeBtn.classList.remove('text-gray-600');
        fiveBeatModeBtn.classList.remove('bg-white', 'shadow-sm');
        fiveBeatModeBtn.classList.add('text-gray-600');
        
        singleModeContent.classList.remove('hidden');
        fiveBeatModeContent.classList.add('hidden');
        singleModeInstructions.classList.remove('hidden');
        fiveBeatInstructions.classList.add('hidden');
        
        if (isPlaying) {
            togglePlayback(); // Stop if playing
        }
    }

    function switchToFiveBeatMode() {
        currentMode = 'fivebeat';
        fiveBeatModeBtn.classList.add('bg-white', 'shadow-sm');
        fiveBeatModeBtn.classList.remove('text-gray-600', 'text-white');
        singleModeBtn.classList.remove('bg-white', 'shadow-sm');
        singleModeBtn.classList.add('text-gray-600');
        
        singleModeContent.classList.add('hidden');
        fiveBeatModeContent.classList.remove('hidden');
        singleModeInstructions.classList.add('hidden');
        fiveBeatInstructions.classList.remove('hidden');
        
        if (isPlaying) {
            togglePlayback(); // Stop if playing
        }
    }

    // Initialize audio and MIDI
    async function initAudio() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();

            if (navigator.requestMIDIAccess) {
                try {
                    const midiAccess = await navigator.requestMIDIAccess({ sysex: false });
                    midiOutputs = Array.from(midiAccess.outputs.values());
                    updateMIDIDevicesList();
                    
                    midiAccess.onstatechange = (event) => {
                        updateMIDIDevicesList();
                    };

                    if (midiOutputs.length > 0) {
                        selectedMidiOutput = midiOutputs[0];
                        usingMIDI = true;
                        updateStatus(`MIDI connected: ${selectedMidiOutput.name}`);
                        testMIDIOutput();
                    } else {
                        updateStatus('No MIDI outputs found. Using audio.');
                    }
                } catch (err) {
                    console.error('MIDI access failed:', err);
                    updateStatus('MIDI access failed. Using audio.');
                }
            } else {
                updateStatus('Web MIDI not supported in this browser. Using audio.');
            }
        } catch (err) {
            console.error('Audio initialization failed:', err);
            showError('Failed to initialize audio: ' + err.message);
        }
    }

    function testMIDIOutput() {
        if (!selectedMidiOutput) return;
        selectedMidiOutput.send([0x90, 60, 100]);
        setTimeout(() => {
            selectedMidiOutput.send([0x80, 60, 0]);
        }, 500);
    }

    function updateMIDIDevicesList() {
        midiDevicesContainer.innerHTML = '';

        if (midiOutputs.length === 0) {
            midiDevicesContainer.innerHTML = '<div class="p-3 text-sm text-gray-500">No MIDI devices found</div>';
            return;
        }

        midiOutputs.forEach(device => {
            const deviceEl = document.createElement('div');
            deviceEl.className = `midi-device p-3 cursor-pointer ${selectedMidiOutput && selectedMidiOutput.id === device.id ? 'selected' : ''}`;
            deviceEl.textContent = device.name || `MIDI Output (${device.id})`;
            deviceEl.dataset.deviceId = device.id;

            deviceEl.addEventListener('click', () => {
                selectedMidiOutput = device;
                usingMIDI = true;
                updateStatus(`MIDI output selected: ${device.name}`);

                document.querySelectorAll('.midi-device').forEach(el => {
                    el.classList.remove('selected');
                });
                deviceEl.classList.add('selected');
                
                testMIDIOutput();
            });

            midiDevicesContainer.appendChild(deviceEl);
        });
    }

    // Fetch heart rate from Adafruit IO - YES, both single mode and Channel 1 of 5-beat mode use the API
    async function fetchHeartRate() {
        console.log("fetchHeartRate called");
        try {
            hideError();
            const url = `https://io.adafruit.com/api/v2/Dr_Ew/feeds/heart-rate`;
            console.log("Fetching from:", url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Adafruit IO returned status code: ${response.status}`);
            }
            
            const feedInfo = await response.json();
            console.log("Feed response:", feedInfo);
            
            if (feedInfo && feedInfo.last_value) {
                heartRate = parseFloat(feedInfo.last_value);
                const timestamp = new Date().toLocaleTimeString();
                console.log("Parsed heart rate:", heartRate, "at", timestamp);

                if (currentMode === 'single') {
                    // Single mode - update display and chart
                    heartRateEl.textContent = `${heartRate} BPM`;
                    lastUpdateEl.textContent = `Last updated: ${timestamp}`;
                    updateHeartRateHistory(heartRate, timestamp);
                    
                    // Set target for interpolation
                    targetHeartRate = heartRate;
                    if (currentHeartRate === null) {
                        currentHeartRate = heartRate;
                    }
                    console.log("Single mode - currentHeartRate set to:", currentHeartRate);
                } else {
                    // 5-beat mode - Update Channel 1 (API source)
                    channels[0].heartRate = heartRate;
                    channels[0].targetHeartRate = heartRate;
                    if (channels[0].currentHeartRate === null) {
                        channels[0].currentHeartRate = heartRate;
                    }
                    document.getElementById('ch1-heart-rate').textContent = `${heartRate} BPM`;
                    console.log("5-beat mode - Channel 1 currentHeartRate set to:", channels[0].currentHeartRate);
                    
                    // Update other channels based on variations (only in 5-beat mode)
                    if (currentMode === 'fivebeat') {
                        updateChannelVariations();
                    }
                }
                
                if (!isPlaying) {
                    updateStatus(`Heart rate: ${heartRate} BPM` + (breathingRate ? `, Breathing rate: ${breathingRate.toFixed(1)} breaths/min` : ''));
                }

                return heartRate;
            } else {
                throw new Error('Could not find the last_value in the feed info');
            }
        } catch (error) {
            console.error('fetchHeartRate error:', error);
            showError(`Error fetching heart rate: ${error.message}`);
            return null;
        }
    }

    // Fetch breathing rate from Adafruit IO - YES, both single mode and Channel 1 of 5-beat mode use the API
    async function fetchBreathingRate() {
        try {
            hideError();
            const url = `https://io.adafruit.com/api/v2/Dr_Ew/feeds/breathing-rate`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Adafruit IO returned status code: ${response.status}`);
            }
            
            const feedInfo = await response.json();
            
            if (feedInfo && feedInfo.last_value) {
                breathingRate = parseFloat(feedInfo.last_value);
                const timestamp = new Date().toLocaleTimeString();

                if (currentMode === 'single') {
                    // Single mode - update display and chart
                    breathingRateEl.textContent = `${breathingRate.toFixed(1)} breaths/min`;
                    updateBreathingRateHistory(breathingRate, timestamp);
                    
                    // Set target for interpolation
                    targetBreathingRate = breathingRate;
                    if (currentBreathingRate === null) {
                        currentBreathingRate = breathingRate;
                    }
                } else {
                    // 5-beat mode - Update Channel 1 (API source)
                    channels[0].breathingRate = breathingRate;
                    channels[0].targetBreathingRate = breathingRate;
                    if (channels[0].currentBreathingRate === null) {
                        channels[0].currentBreathingRate = breathingRate;
                    }
                    document.getElementById('ch1-breathing-rate').textContent = `${breathingRate.toFixed(1)} br/min`;
                    
                    // Update other channels based on variations (only in 5-beat mode)
                    if (currentMode === 'fivebeat') {
                        updateChannelVariations();
                    }
                }
                
                if (!isPlaying) {
                    updateStatus(`Heart rate: ${heartRate || '--'} BPM, Breathing rate: ${breathingRate.toFixed(1)} breaths/min`);
                }

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

    // Update channel variations for 5-beat mode
    function updateChannelVariations() {
        console.log("updateChannelVariations called for 5-beat mode only");
        
        // Only update channels 2-5 with their assigned loops (skip channel 1 which uses API)
        for (let i = 1; i < 5; i++) {
            const channel = channels[i];
            
            // If no loop assigned yet, assign one randomly
            if (!channel.currentLoop) {
                assignRandomLoop(i);
            }
            
            const loopData = prerecordedData[channel.currentLoop];
            
            // Check if we've reached the end of the current loop
            if (channel.loopIndex >= loopData.heart_rate.length) {
                console.log(`Channel ${i + 1} finished ${channel.currentLoop}, assigning new random loop`);
                assignRandomLoop(i);
            }
            
            // Get current data point with random variation
            const currentLoopData = prerecordedData[channel.currentLoop];
            const variation = 0.95 + Math.random() * 0.1; // ±5% random variation
            
            channel.heartRate = Math.round(currentLoopData.heart_rate[channel.loopIndex] * variation);
            channel.breathingRate = currentLoopData.breathing_rate[channel.loopIndex] * variation;
            channel.targetHeartRate = channel.heartRate;
            channel.targetBreathingRate = channel.breathingRate;
            
            if (channel.currentHeartRate === null) {
                channel.currentHeartRate = channel.heartRate;
                channel.currentBreathingRate = channel.breathingRate;
            }
            
            // Update UI
            document.getElementById(`ch${i + 1}-heart-rate`).textContent = `${channel.heartRate} BPM`;
            document.getElementById(`ch${i + 1}-breathing-rate`).textContent = `${channel.breathingRate.toFixed(1)} br/min`;
            
            console.log(`Channel ${i + 1}: ${channel.currentLoop}[${channel.loopIndex}] HR=${channel.heartRate}, BR=${channel.breathingRate.toFixed(1)}`);
            
            // Increment loop index for next update
            channel.loopIndex++;
        }
        
        console.log("updateChannelVariations completed, all channels updated");
    }

    // Remove old updatePreRecordedChannels function since we don't need it anymore

    // Update history functions (for single mode)
    function updateHeartRateHistory(rate, timestamp) {
        heartRateHistory.push({ rate: rate, timestamp: timestamp });
        if (heartRateHistory.length > 10) {
            heartRateHistory.shift();
        }
        updateChartWithHistory();
    }

    function updateBreathingRateHistory(rate, timestamp) {
        breathingRateHistory.push({ rate: rate, timestamp: timestamp });
        if (breathingRateHistory.length > 10) {
            breathingRateHistory.shift();
        }
        updateBreathingChartWithHistory();
    }

    function updateChartWithHistory() {
        heartRateChart.data.labels = heartRateHistory.map(item => item.timestamp);
        heartRateChart.data.datasets[0].data = heartRateHistory.map(item => item.rate);

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

    function updateBreathingChartWithHistory() {
        breathingRateChart.data.labels = breathingRateHistory.map(item => item.timestamp);
        breathingRateChart.data.datasets[0].data = breathingRateHistory.map(item => item.rate);

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

    // Interpolation update for smooth transitions
    function updateInterpolation() {
        if (!isPlaying) return;

        if (currentMode === 'single') {
            // Single mode interpolation
            if (currentHeartRate !== null && targetHeartRate !== null) {
                if (Math.abs(currentHeartRate - targetHeartRate) < 0.1) {
                    currentHeartRate = targetHeartRate;
                } else {
                    currentHeartRate += (targetHeartRate - currentHeartRate) * 0.1;
                }
            }

            if (currentBreathingRate !== null && targetBreathingRate !== null) {
                if (Math.abs(currentBreathingRate - targetBreathingRate) < 0.1) {
                    currentBreathingRate = targetBreathingRate;
                } else {
                    currentBreathingRate += (targetBreathingRate - currentBreathingRate) * 0.1;
                }
            }
            
            if (currentHeartRate && currentBreathingRate) {
                updateStatus(`Playing: tempo ${Math.round(currentHeartRate)} BPM, pitch offset based on breathing rate (${currentBreathingRate.toFixed(1)} breaths/min)`);
            }
        } else {
            // 5-beat mode interpolation
            channels.forEach(channel => {
                if (channel.currentHeartRate !== null && channel.targetHeartRate !== null) {
                    if (Math.abs(channel.currentHeartRate - channel.targetHeartRate) < 0.1) {
                        channel.currentHeartRate = channel.targetHeartRate;
                    } else {
                        channel.currentHeartRate += (channel.targetHeartRate - channel.currentHeartRate) * 0.1;
                    }
                }

                if (channel.currentBreathingRate !== null && channel.targetBreathingRate !== null) {
                    if (Math.abs(channel.currentBreathingRate - channel.targetBreathingRate) < 0.1) {
                        channel.currentBreathingRate = channel.targetBreathingRate;
                    } else {
                        channel.currentBreathingRate += (channel.targetBreathingRate - channel.currentBreathingRate) * 0.1;
                    }
                }
            });
        }
    }

    // Schedule notes for single mode
    function scheduleNote(time) {
        let noteValue = parseInt(midiNoteSelect.value);
        let pitchOffset = 0;
        
        if (currentBreathingRate !== null) {
            const normalBreathingRate = 14;
            const maxPitchChange = pitchRange / 2;
            pitchOffset = ((currentBreathingRate - normalBreathingRate) / normalBreathingRate) * maxPitchChange;
            pitchOffset = Math.max(-maxPitchChange, Math.min(maxPitchChange, pitchOffset));
        }

        const adjustedNote = noteValue + pitchOffset;

        if (usingMIDI && selectedMidiOutput) {
            const roundedNote = Math.round(adjustedNote);
            const safeNote = Math.max(0, Math.min(127, roundedNote));
            
            try {
                // Send MIDI note immediately, not with timestamp
                selectedMidiOutput.send([0x90, safeNote, 100]);
                setTimeout(() => {
                    try {
                        selectedMidiOutput.send([0x80, safeNote, 0]);
                    } catch (err) {
                        console.error("Error sending MIDI note off:", err);
                    }
                }, 100);
            } catch (err) {
                console.error("Error sending MIDI note on:", err);
                playAudioNote(adjustedNote, time);
            }
        } else if (audioContext) {
            playAudioNote(adjustedNote, time);
        }
    }

    // Schedule notes for 5-beat mode
    function scheduleChannelNote(channelIndex, time) {
        const channel = channels[channelIndex];
        if (!channel.currentHeartRate || !channel.currentBreathingRate || !channel.enabled) {
            console.log(`Channel ${channelIndex + 1} note skipped: HR=${channel.currentHeartRate}, BR=${channel.currentBreathingRate}, enabled=${channel.enabled}`);
            return;
        }

        let noteValue = parseInt(midiNoteSelect.value);
        let pitchOffset = 0;
        
        const normalBreathingRate = 14;
        const maxPitchChange = pitchRange / 2;
        pitchOffset = ((channel.currentBreathingRate - normalBreathingRate) / normalBreathingRate) * maxPitchChange;
        pitchOffset = Math.max(-maxPitchChange, Math.min(maxPitchChange, pitchOffset));

        const adjustedNote = noteValue + pitchOffset;
        const midiChannel = channel.midiChannel; // Use assigned MIDI channel

        console.log(`Channel ${channelIndex + 1}: Playing note ${adjustedNote} on MIDI channel ${midiChannel + 1}`);

        if (usingMIDI && selectedMidiOutput) {
            const roundedNote = Math.round(adjustedNote);
            const safeNote = Math.max(0, Math.min(127, roundedNote));
            
            try {
                // Send MIDI note immediately, not with timestamp
                selectedMidiOutput.send([0x90 + midiChannel, safeNote, 100]);
                setTimeout(() => {
                    try {
                        selectedMidiOutput.send([0x80 + midiChannel, safeNote, 0]);
                    } catch (err) {
                        console.error("Error sending MIDI note off:", err);
                    }
                }, 100);
            } catch (err) {
                console.error("Error sending MIDI note on:", err);
                playAudioNote(adjustedNote, time);
            }
        } else if (audioContext) {
            playAudioNote(adjustedNote, time);
        }

        // Visual feedback - highlight channel card
        const channelCard = document.querySelector(`.channel-${channelIndex + 1}`);
        if (channelCard) {
            channelCard.classList.add('playing');
            setTimeout(() => {
                channelCard.classList.remove('playing');
            }, 150);
        }
    }

    function playAudioNote(note, time) {
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        const frequency = 440 * Math.pow(2, (note - 69) / 12);
        osc.frequency.value = frequency;
        gainNode.gain.value = volume;

        osc.connect(gainNode);
        gainNode.connect(audioContext.destination);

        osc.start(time);
        osc.stop(time + 0.1);
    }

    // Single mode scheduler
    function scheduler() {
        console.log("Single mode scheduler called, isPlaying:", isPlaying, "currentMode:", currentMode, "currentHeartRate:", currentHeartRate);
        
        if (!isPlaying || currentMode !== 'single') {
            console.log("Single mode scheduler stopping - isPlaying:", isPlaying, "currentMode:", currentMode);
            return;
        }
        
        if (currentHeartRate === null) {
            console.log("Scheduler: No heart rate data available, currentHeartRate:", currentHeartRate);
            return;
        }

        const secondsPerBeat = 60.0 / currentHeartRate;
        const currentTime = audioContext.currentTime;

        // Schedule notes until we're 100ms ahead
        while (nextNoteTime < currentTime + 0.1) {
            console.log(`Scheduling note at ${nextNoteTime}, current time: ${currentTime}, HR: ${currentHeartRate}`);
            scheduleNote(nextNoteTime);
            nextNoteTime += secondsPerBeat;
        }

        setTimeout(scheduler, 25);
    }

    // 5-beat mode scheduler
    function channelScheduler(channelIndex) {
        const channel = channels[channelIndex];
        if (!isPlaying || currentMode !== 'fivebeat' || !channel.currentHeartRate || !channel.enabled) {
            console.log(`Channel ${channelIndex + 1} scheduler stopped: playing=${isPlaying}, mode=${currentMode}, HR=${channel.currentHeartRate}, enabled=${channel.enabled}`);
            return;
        }

        const secondsPerBeat = 60.0 / channel.currentHeartRate;
        const currentTime = audioContext.currentTime;

        // Schedule notes until we're 100ms ahead
        while (channel.nextNoteTime < currentTime + 0.1) {
            console.log(`Scheduling Channel ${channelIndex + 1} note at ${channel.nextNoteTime}, HR: ${channel.currentHeartRate}`);
            scheduleChannelNote(channelIndex, channel.nextNoteTime);
            channel.nextNoteTime += secondsPerBeat;
        }

        channel.timerID = setTimeout(() => channelScheduler(channelIndex), 25);
    }

    // Toggle play/pause
    async function togglePlayback() {
        console.log("togglePlayback called, isPlaying:", isPlaying, "currentMode:", currentMode);
        
        if (!isPlaying) {
            // Start playing
            console.log("Starting playback...");
            
            // SET isPlaying = true FIRST, before starting schedulers
            isPlaying = true;
            
            if (audioContext && audioContext.state === 'suspended') {
                console.log("Resuming audio context...");
                await audioContext.resume();
            }

            if (currentMode === 'single') {
                console.log("Single mode playback");
                
                // Single mode - get current rates
                if (!heartRate) {
                    console.log("No heart rate data, fetching...");
                    const rate = await fetchHeartRate();
                    console.log("Fetched heart rate:", rate);
                    if (!rate) {
                        console.log("Failed to get heart rate, aborting playback");
                        isPlaying = false; // Reset on failure
                        return;
                    }
                }
                if (!breathingRate) {
                    console.log("No breathing rate data, fetching...");
                    await fetchBreathingRate();
                    console.log("Fetched breathing rate:", breathingRate);
                }

                // Set up initial interpolation values
                currentHeartRate = heartRate;
                targetHeartRate = heartRate;
                currentBreathingRate = breathingRate;
                targetBreathingRate = breathingRate;

                console.log("Setting up single mode:", {
                    currentHeartRate,
                    currentBreathingRate,
                    audioContextTime: audioContext.currentTime
                });

                nextNoteTime = audioContext.currentTime;
                updateStatus(`Playing: tempo ${Math.round(currentHeartRate)} BPM, pitch based on breathing rate`);
                
                console.log("Starting single mode scheduler...");
                scheduler();
            } else {
                console.log("5-beat mode playback");
                
                // 5-beat mode - initialize all channels
                if (!channels[0].heartRate) {
                    console.log("No channel 1 heart rate data, fetching...");
                    await fetchHeartRate();
                    await fetchBreathingRate();
                }

                console.log("Channel states before starting:", channels.map(ch => ({
                    id: ch.id,
                    heartRate: ch.currentHeartRate,
                    breathingRate: ch.currentBreathingRate,
                    enabled: ch.enabled
                })));

                // Initialize timing for all channels
                const currentTime = audioContext.currentTime;
                channels.forEach((channel, index) => {
                    if (channel.currentHeartRate && channel.enabled) {
                        channel.nextNoteTime = currentTime + (index * 0.1); // Slight offset for each channel
                        console.log(`Starting scheduler for channel ${index + 1}, nextNoteTime: ${channel.nextNoteTime}, isPlaying: ${isPlaying}`);
                        channelScheduler(index);
                    } else {
                        console.log(`Skipping channel ${index + 1}: HR=${channel.currentHeartRate}, enabled=${channel.enabled}`);
                    }
                });

                const enabledChannels = channels.filter(ch => ch.enabled).length;
                updateStatus(`Playing 5-Beat Mode: ${enabledChannels} channels active`);
            }

            // Start interpolation
            console.log("Starting interpolation interval...");
            interpolationInterval = setInterval(updateInterpolation, 50);

            // Update UI
            playBtn.innerHTML = '<i data-feather="pause" class="mr-2"></i> Stop';
            playBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            playBtn.classList.add('bg-red-500', 'hover:bg-red-600');
            feather.replace();

            console.log("Playback started successfully, isPlaying:", isPlaying);

            // Set up auto-update if enabled
            if (autoUpdateCheckbox.checked) {
                startAutoUpdate();
            }
        } else {
            console.log("Stopping playback...");
            
            // Stop playing
            isPlaying = false;
            
            // Stop all channel timers
            channels.forEach((channel, index) => {
                if (channel.timerID) {
                    console.log(`Stopping timer for channel ${index + 1}`);
                    clearTimeout(channel.timerID);
                    channel.timerID = null;
                }
            });
            
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
            
            // Update status
            if (currentMode === 'single') {
                if (heartRate && breathingRate) {
                    updateStatus(`Heart rate: ${heartRate} BPM, Breathing rate: ${breathingRate.toFixed(1)} breaths/min`);
                } else {
                    updateStatus('Ready to play');
                }
            } else {
                updateStatus('5-Beat Mode ready');
            }
            
            console.log("Playback stopped");
        }
    }

    // Auto update functions
    function startAutoUpdate() {
        if (autoUpdateInterval) {
            clearInterval(autoUpdateInterval);
        }

        const intervalSeconds = parseInt(updateIntervalSelect.value);

        fetchHeartRate();
        fetchBreathingRate();
        
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

    // Event listeners - FIXED: Proper button event handling
    singleModeBtn.addEventListener('click', switchToSingleMode);
    fiveBeatModeBtn.addEventListener('click', switchToFiveBeatMode);

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
            startAutoUpdate();
        }
    });

    midiNoteSelect.addEventListener('change', function() {
        midiNote = parseInt(this.value);
    });

    // Remove the old data source event listeners since we no longer need them
    
    // 5-Beat mode now automatically uses all 4 pre-recorded loops
    // dataSourceSelect.addEventListener('change', function() {
    //     if (currentMode === 'fivebeat') {
    //         updateChannelVariations();
    //     }
    // });

    // loopOffsetSlider.addEventListener('input', function(e) {
    //     const offsetValue = parseInt(e.target.value);
    //     offsetValueDisplay.textContent = `${offsetValue}s`;
    //     if (currentMode === 'fivebeat') {
    //         updateChannelVariations();
    //     }
    // });

    // Channel enable/disable and MIDI channel assignment listeners
    for (let i = 1; i <= 5; i++) {
        // Enable/disable checkbox listeners
        document.getElementById(`ch${i}-enabled`).addEventListener('change', function() {
            channels[i-1].enabled = this.checked;
            
            // Stop the channel if it's disabled while playing
            if (!this.checked && isPlaying && channels[i-1].timerID) {
                clearTimeout(channels[i-1].timerID);
                channels[i-1].timerID = null;
            }
            // Start the channel if it's enabled while playing
            else if (this.checked && isPlaying && currentMode === 'fivebeat' && channels[i-1].currentHeartRate) {
                channels[i-1].nextNoteTime = audioContext.currentTime;
                channelScheduler(i-1);
            }
            
            // Update status
            if (isPlaying && currentMode === 'fivebeat') {
                const enabledChannels = channels.filter(ch => ch.enabled).length;
                updateStatus(`Playing 5-Beat Mode: ${enabledChannels} channels active`);
            }
        });

        // MIDI channel assignment listeners
        document.getElementById(`ch${i}-midi-channel`).addEventListener('change', function() {
            channels[i-1].midiChannel = parseInt(this.value);
        });
    }

    // Initialize
    initAudio();
    
    // Start auto-update if enabled
    if (autoUpdateCheckbox.checked) {
        startAutoUpdate();
    } else {
        fetchHeartRate();
        fetchBreathingRate();
    }

    // Initialize with single mode
    switchToSingleMode();
}