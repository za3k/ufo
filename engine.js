window.engine = (function() {

var state = {}

$(".tabs > *").on("click", e => {
    const target = $(e.target).data("target")

    $(".tabs > *.active").removeClass("active")
    $(".pane.active").removeClass("active")

    $(e.target).addClass("active")
    $(`#${target}`).addClass("active")
})

function wait(s) {
    if (state.TESTING) return new Promise(resolve => resolve())
    return new Promise(resolve => setTimeout(resolve, s*1000))
}

function revealTab(tabId) {
    $(".tabs").show()
    const tabLabel = $(`.tabs data-target[${tabId}]`).removeClass("hidden")
}

function revealLog() {
    $(".log").show()
}

function setStatus(t) {
    $(".pane.active .status").text(t)
    $(".log").prepend($(`<div>${t}</div>`))
}

function runEvent(event) {
    if (typeof(event) == "string") event = engine.data.events[event]
    event()
}

function runAction(action) {
    if (action.f) action.f.bind(action)()
}

function addAction(key) {
    const action = engine.data.actions[key]
    action.key = key
    action.name ||= action.key

    const e = $(`<div class="action">${action.name}</div>`)
    action.e = e
    $(".pane.active").append(e)
    e.on("click", () => runAction(action))
}

function removeAction(key) {
    const action = engine.data.actions[key]
    if (!action.e) return
    action.e.remove()
    delete action.e
}

return {state, runAction, addAction, runEvent, setStatus, revealLog, revealTab, wait, removeAction}

})()

for (let k of Object.keys(engine)) {
    if (typeof(engine[k]) == "function") window[k] = engine[k]
}
