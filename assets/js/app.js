const m = require('mithril')

const MainWindow = require('./ui/mainwindow')

function setLoading (isLoading, ldMessage) {
    const contents = document.getElementById('contents')
    const ldblock = document.getElementById('loading')
    const ldtext = document.getElementById('loadingtext')
    if (isLoading) {
        if (ldMessage) {
            ldtext.textContent = ldMessage
        }
        ldblock.classList.add('visible')
        contents.classList.remove('visible')
    } else {
        ldblock.classList.remove('visible')
        contents.classList.add('visible')
    }
}

const StarsApp = {}

StarsApp.oninit = function () {
    const self = this
    self.toggleTraining = (enabled) => {
        self.trainingMode = enabled
        self.trainingMode ? document.body.classList.add('training') : document.body.classList.remove('training')
    }
    self.toggleTraining(false)
}

StarsApp.oncreate = function () {
    setLoading(false)
}

StarsApp.view = function () {
    const self = this
    return m(MainWindow, {training: self.trainingMode, location: 'Main Menu', maximized: false})
}

m.mount(document.getElementById('contents'), StarsApp)