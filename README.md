# FRESHCISION prototype

Open `index.html` in a browser. No install or server is needed.

```
freshcision/
├── index.html        page shell, loads everything below in order
├── css/
│   ├── base.css      tokens, reset, layout, components
│   └── theme.css     agri-coastal colors and premium polish (overrides base.css)
└── js/
    ├── data.js       places, keywords, sample text, tips, providers
    ├── state.js      app state S, saved draft, language helper T()
    ├── ui.js         icons, toast, navigation, shared components
    ├── ai.js         simulated AI: interpret(), nextQ(), send()
    ├── flow.js       providers, submit, send to providers, voice input
    ├── screens.js    one function per screen, plus render R()
    └── actions.js    button handlers A{}, listeners, start-up
```

Notes
- Filipino text: use `T('English','Filipino')`.
- To plug in a real AI, replace `interpret()` in `js/ai.js`.
- To plug in real providers, replace `PROV` in `js/data.js`.
