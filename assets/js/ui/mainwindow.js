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

MainWindow.view = function () {
    const self = this
    return m('.jumbotron.appwindow.maximized.d-flex.flex-column', [
        m('.row.flex-shrink-0', [
            m('.col-auto', [
                m('img.applogo', {src: 'assets/img/stars_logo.svg'})
            ]),
            m('.col', [
                m('div.header-wrapper.mt-3.mb-2', m('ol.header', [
                    m('li', m('span', 'Welcome, Jean-François')),
                    m('li', m('span', 'Monday, May 7 2018, 17:03')),
                    m('li', m('span', process.env.VERSION)),
                    m('li', m('span', process.env.APP_MODE)),
                    m('li', m('span', 'Main Menu')),
                ])),
                m('.form-group', [
                    m('input.form-control#search', {
                        placeholder: self.searchCommandMode ? 'Enter your command here...' : 'Enter your search here...',
                        oninput: m.withAttr('value', self.goSearch),
                        value: self.searchValue
                    })
                ])
            ])
        ])
    ])
}

module.exports = MainWindow