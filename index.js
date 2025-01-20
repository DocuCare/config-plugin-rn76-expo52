const { withGradleProperties } = require("@expo/config-plugins")

const RN_76_GRADLE_PROPERTIES = {
  "android.enableJetifier": true,
  "org.gradle.jvmargs": "-Xmx4096m -XX:MaxMetaspaceSize=512m"
}

function updateGradleProperties(config, properties) {
    return withGradleProperties(config, exportedConfig => {
        Object.entries(properties).forEach(([key, value]) => {
            const keyIdx = exportedConfig.modResults.findIndex(property => property.key === key)
            if (keyIdx === -1) {
                exportedConfig.modResults.push({
                    type: "property",
                    key,
                    value
                })
            } else {
                exportedConfig.modResults.splice(keyIdx, 1, {
                    type: 'property',
                    key,
                    value,
                });
            }
        })
        return exportedConfig
    })
}

function withConfigPlugin(config) {
  config = updateGradleProperties(config, RN_76_GRADLE_PROPERTIES)
  return config
}

module.exports = withConfigPlugin
