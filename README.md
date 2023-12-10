## Parent App

## Description

- This is the e-skooler parent app created in react native expo

## To Start Locally

```
yarn
yarn expo start
```

- To start directly in android simulator - (`yarn android`)
- To start directly in xcode simulator - (`yarn ios`)

## To Publish in expo

```
expo publish
```

If the above is not working then please use the below command since expo publish is deprecated
```
npx expo install expo-updates  
eas update --branch master or development or any branch --message "fixes and release details"
```

## To create build

- To create android apk build eas login is required.
- Login in terminal and run the second line to initiate the build request in expo.

```
eas login
eas build -p android/ios/all --profile development/preview/production
```

- Then visit to expo.dev -> ParentApp -> Builds (In Sidebar). This will take time to finish the build. After that we can download the APK file.
