jest.mock('@expo/config-plugins', () => ({
    withGradleProperties: (config, action) => {
        const exportedConfig = {
            modResults: config.android.gradleProperties.modResults
        };
        const result = action(exportedConfig);
        return {
            ...config,
            android: {
                ...config.android,
                gradleProperties: result
            }
        };
    }
}));

const withConfigPlugin = require('./index');

describe('Gradle Properties Plugin', () => {
    test('should add properties when none exist', () => {
        const mockConfig = {
            modResults: []
        };
        
        const config = {
            android: {
                gradleProperties: mockConfig
            }
        };

        const result = withConfigPlugin(config);
        const properties = result.android.gradleProperties.modResults;

        expect(properties).toContainEqual({
            type: 'property',
            key: 'android.enableJetifier',
            value: true
        });
        expect(properties).toContainEqual({
            type: 'property',
            key: 'org.gradle.jvmargs',
            value: '-Xmx4096m -XX:MaxMetaspaceSize=512m'
        });
        expect(properties.length).toBe(2);
    });

    test('should update existing properties', () => {
        const mockConfig = {
            modResults: [
                {
                    type: 'property',
                    key: 'android.enableJetifier',
                    value: false
                },
                {
                    type: 'property',
                    key: 'org.gradle.jvmargs',
                    value: '-Xmx2048m'
                }
            ]
        };

        const config = {
            android: {
                gradleProperties: mockConfig
            }
        };

        const result = withConfigPlugin(config);
        const properties = result.android.gradleProperties.modResults;

        expect(properties).toContainEqual({
            type: 'property',
            key: 'android.enableJetifier',
            value: true
        });
        expect(properties).toContainEqual({
            type: 'property',
            key: 'org.gradle.jvmargs',
            value: '-Xmx4096m -XX:MaxMetaspaceSize=512m'
        });
        expect(properties.length).toBe(2);
    });
}); 