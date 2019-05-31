axios({
    url: "../sample.wav",
    responseType: "arraybuffer"
}).then(response => {
    const audioData = response.data
    //it is of the type array buffer object
    console.log(typeof (audioData))
    console.log(audioData.byteLength)
    console.log(audioData)

    //Turn arraybuffer into float32 values

    /*Create a dataview referring to the buffer
    const view1 = new DataView(audioData).setUint8()
    console.log('data view1', view1)
    const view2 = new DataView(audioData).setFloat32()
    console.log('data view2', view2) */

    /*const array16 = new Float32Array()
    const view1 = new Uint8Array(array16)
    const view2 = new Uint8Array(audioData)
    view2.set(view1)
    console.log('view2', view2)*/

    //Create a Int16 array view referring to the buffer.
    const array16 = new Int16Array(audioData)
    console.log('array view', array16)
    console.log('array length', array16.length)
    /* Now we have an array of 5,36,609 16 bit integers. This wav has a sample rate of
    5,36,609/38 = 14,121 samples/s */

    //Converting the waveform data to a format in which it can be rendered

    const containers = []
    const spaceBetweenConts = 0.2
    const numberOfContainers = 100
    const containerDataSize = Math.floor(array16.length / numberOfContainers)
    console.log('containerDataSize', containerDataSize)
    //5366

    for (let i = 0; i < numberOfContainers; i++) {
        let begin = i * containerDataSize
        let end = i * containerDataSize + containerDataSize
        let maximum = 0

        for (let j = begin; j < end; j++) {
            if (array16[j] > maximum) maximum = array16[j]
        }

        let size = Math.abs(maximum)
        containers.push(size / 2)
    }
    console.log('containers', containers)

    document.getElementById('waveform-mask').innerHTML = containers.map((container, i) => {
        let containerSVGWidth = 100.0 / containers.length
        //console.log('containerSVGWidth', containerSVGWidth * i + spaceBetweenConts / 2.0)
        let containerSVGHeight = container / 307
        console.log('containerSVGHeight', containerSVGHeight)

        return `<rect
        x = ${containerSVGWidth * i + spaceBetweenConts / 2.0}
        y = ${(100 - containerSVGHeight) / 2.0}
        width = ${containerSVGWidth - spaceBetweenConts}
        height = ${containerSVGHeight} />`
    }).join("")

    let audioElement = document.getElementById('audio-element')
    let waveformProgress = document.getElementById('waveform-progress')
    // every 100 milliseconds, update the waveform-progress SVG with a new width - the percentage of time elapsed on the audio file
    setInterval(() => {
        waveformProgress.setAttribute('width', audioElement.currentTime / audioElement.duration * 100);
    }, 100)

}, () => console.log("unable to decode"))

module.exports = 'reading-data'