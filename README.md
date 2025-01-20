# config-plugin-rn76-expo52
> Expo config plugin to get android builds working with react native 0.76 and expo 52

## What it does

- enables jettifier support
- configures jvmargs to help with heap space issue

## Usage

- Add it as dependency in package.json:

```
"config-plugin-rn76-expo52": "git+https://github.com/DocuCare/config-plugin-rn76-expo52.git"
```
or

```shell
yarn add DocuCare/config-plugin-rn76-expo52 # yarn
npm install --save DocuCare/config-plugin-rn76-expo52 # npm
```

- Add the plugin to `plugins` in your `app.config.{js,ts}`

```
plugins: [
  "config-plugin-rn76-expo52"
]
```

## Typical Errors this solves

1. Jetifier turned on RN0.76 but certain libs need it
```
[com.android.support:animated-vector-drawable:28.0.0] Users/<SOME_USER>/.gradle/caches/8.10.2/transforms/e0baeecaf65902bb6eae3d6d570f8a9f/transformed/animated-vector-drawable-28.0.0/AndroidManifest.xml Warning:
        Namespace 'android.support.graphics.drawable' is used in multiple modules and/or libraries: com.android.support:animated-vector-drawable:28.0.0, com.android.support:support-vector-drawable:28.0.0. Please ensure that all modules and libraries have a unique namespace. For more information, See https://developer.android.com/studio/build/configure-app-module#set-namespace
[androidx.versionedparcelable:versionedparcelable:1.1.1] Users/<SOME_USER>/.gradle/caches/8.10.2/transforms/ee412a99dd323febf10f2f7426e9f674/transformed/versionedparcelable-1.1.1/AndroidManifest.xml Warning:
        Namespace 'androidx.versionedparcelable' is used in multiple modules and/or libraries: androidx.versionedparcelable:versionedparcelable:1.1.1, com.android.support:versionedparcelable:28.0.0. Please ensure that all modules and libraries have a unique namespace. For more information, See https://developer.android.com/studio/build/configure-app-module#set-namespace
Users/<SOME_USER>/some_expo_app/android/app/src/debug/AndroidManifest.xml:28:18-86 Error:
        Attribute application@appComponentFactory value=(androidx.core.app.CoreComponentFactory) from [androidx.core:core:1.13.1] AndroidManifest.xml:28:18-86
        is also present at [com.android.support:support-compat:28.0.0] AndroidManifest.xml:22:18-91 value=(android.support.v4.app.CoreComponentFactory).
        Suggestion: add 'tools:replace="android:appComponentFactory"' to <application> element at AndroidManifest.xml:6:5-162 to override.
```

2. Heap space seems to be low (`-Xmx2048m` seems to be the default set in `android/gradle.properties` as far as available memory allocation pool)

```
> Task :app:checkDebugAarMetadata FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugAarMetadata'.
> Could not resolve all files for configuration ':app:debugRuntimeClasspath'.
   > Failed to transform react-android-0.76.6-debug.aar (com.facebook.react:react-android:0.76.6) to match attributes {artifactType=android-aar-metadata, com.android.build.api.attributes.BuildTypeAttr=debug, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=aar, org.gradle.status=release, org.gradle.usage=java-runtime}.
      > Execution failed for JetifyTransform: Users/<SOME_USER>/.gradle/caches/modules-2/files-2.1/com.facebook.react/react-android/0.76.6/bb363a7f13eda3b0c487424227757018f2c3295/react-android-0.76.6-debug.aar.
         > Java heap space
```
