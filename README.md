# config-plugin-rn76-expo52
> Expo config plugin to get things working with react native 0.76 and expo 52

## What it does

- enables jettifier support
- configures jvmargs to help with heap space issue

## Usage

- Add it as dependency in package.json:

```
"config-plugin-rn76-expo52": "git+https://github.com/DocuCare/config-plugin-rn76-expo52.git"
```

- Add the plugin to `plugins` in your `app.config.{js,ts}`

```
plugins: [
  "config-plugin-rn76-expo52"
]
```
