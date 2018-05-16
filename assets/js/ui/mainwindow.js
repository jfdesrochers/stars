const m = require('mithril')

const MainWindow = {}

MainWindow.oninit = function (vnode) {
    const self = this
    self.props = vnode.attrs
    self.searchValue = ''
    self.searchCommandMode = false
    self.goSearch = function (value) {
        if (value === '.') {
            self.searchValue = ''
            self.searchCommandMode = !self.searchCommandMode
        } else {
            self.searchValue = value
        }
    }
}

MainWindow.oncreate = function () {
    const self = this
    self.updateTime = () => {
        const domtime = document.getElementById('curTime')
        if (domtime) {
            domtime.textContent = new Date().toLocaleString('en-CA', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false})
        }
    }
    self.timeInt = setInterval(self.updateTime, 1000)
    self.updateTime()
}

MainWindow.onremove = function () {
    const self = this
    clearInterval(self.timeInt)
}

MainWindow.view = function () {
    const self = this
    return self.props.maximized ? m('.jumbotron.appwindow.maximized.d-flex.flex-column', [
        m('.row.flex-shrink-0', [
            m('.col-auto', [
                m('img.applogo', {src: `assets/img/stars_logo${self.props.training ? '_training' : ''}.svg`})
            ]),
            m('.col', [
                m('div.header-wrapper.mt-3.mb-2', m('ol.header', [
                    m('li', m('span', 'Welcome, Jean-François')),
                    m('li', m('span#curTime', '')),
                    m('li', m('span', process.env.VERSION)),
                    m('li', m('span', self.props.training ? 'Training' : process.env.APP_MODE)),
                    m('li', m('span', self.props.location)),
                ])),
                m(`.form-group.autocomplete.open${self.searchCommandMode ? '.command' : ''}`, [
                    m('input.form-control#search', {
                        placeholder: self.searchCommandMode ? 'Enter your command here...' : 'Enter your search here...',
                        oninput: m.withAttr('value', self.goSearch),
                        value: self.searchValue
                    }),
                    m('ul.autocomplete-items', [
                        m('li', 'test'),
                        m('li', 'test'),
                        m('li.autocomplete-active', 'test'),
                        m('li', 'test'),
                        m('li', 'test')
                    ])
                ])
            ])
        ])
    ]) : m('.jumbotron.appwindow', [
        m('.text-center', [
            m('img.applogo', {src: `assets/img/stars_logo${self.props.training ? '_training' : ''}.svg`}),
            m('h3.titletext.mb-2', self.props.location)
        ]),
        m('div.small-footer.text-muted', [
            m('span', process.env.VERSION + ' | '),
            m('span', (self.props.training ? 'Training' : process.env.APP_MODE) + ' | '),
            m('span#curTime', '')
        ])
    ])
}

module.exports = MainWindow