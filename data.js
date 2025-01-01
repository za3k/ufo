engine.data = (function() {

var events = {
    "start game": async () => {
        setStatus("you are heading home through the woods late at night")
        addAction("go left")
        addAction("go right")
    },
    "lost": async () => {
        removeAction("keep going")
        removeAction("turn around")
        await wait(1)
        setStatus("you have no idea where you are")
        await wait(2)
        addAction("keep going2")

    },
    "pick direction": async () => {
        removeAction("go left")
        removeAction("go right")
        await wait(1)
        setStatus("wait, is this the right way?")
        await wait(2)
        addAction("keep going")
        addAction("turn around")
    }
}
var actions = {
    "go left": {
        f: () => { runEvent("pick direction") },
    },
    "go right": {
        f: () => { runEvent("pick direction") },
    },
    "keep going": {
        f: async function() { 
            this.n = (this.n||0) + 1
            removeAction("turn around")
            if (this.n <= 2) {
                removeAction(this.name)
                await wait(1)
            }
            if (this.n == 1) setStatus("yes, you're sure this is right")
            if (this.n == 2) setStatus("this is... yes, you're sure this is the right way now")
            if (this.n == 3) runEvent("lost")
            if (this.n <= 2) {
                await wait(2)
                addAction(this.name)
            }
        }
    },
    "keep going2": {
        name: "keep going",
        f: async function() { 
            removeAction("keep going2")
            await wait(1)
            setStatus("it's very cold")
            await wait(3)
            addAction("shiver")
        }
    },
    "shiver": {
        f: async function() { 
            removeAction("shiver")
            await wait(10)
            setStatus("it begins to rain")
            await wait(2)
            addAction("look for shelter")
        }
    },
    "turn around": {
        f: async function() { 
            this.n = (this.n||0) + 1
            if (this.n <= 3) {
                removeAction(this.name)
                removeAction("keep going")
                await wait(1)
            }
            if (this.n == 1) setStatus("wait, it was the other way")
            if (this.n == 2) setStatus("or was it this way?")
            if (this.n == 3) setStatus("you hesitate, and turn around again")
            if (this.n == 4) runEvent("lost")
            if (this.n <= 3) {
                await wait(2)
                addAction(this.name)
                addAction("keep going")
            }
        }
    },
    "look for shelter": {
        f: async function() { 
            revealTab("start")
            removeAction("look for shelter")
            await wait(3)
            setStatus("you find a clearing in the forest")
            await wait(2)
            revealLog()
            setStatus("it is even wetter without trees")
            await wait(2)
            addAction("investigate clearing")
            addAction("look at rainclouds")
            addAction("investigate forest")
            addAction("shelter under a tree")
        }
    },
    "investigate clearing": {},
    "look at rainclouds": {},
    "investigate forest": {},
    "shelter under a tree": {},
}

return {events, actions}

})()
