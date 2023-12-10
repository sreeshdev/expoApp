// Don't forget to specify your TAMAGUI_TARGET here or ideally in the command to run / .env files

process.env.TAMAGUI_TARGET = "native";
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],

    plugins: [
      // NOTE: this is required to pass the right environment

      [
        "transform-inline-environment-variables",

        // NOTE: include is optional, you can leave this part out

        {
          include: ["TAMAGUI_TARGET"],
        },
      ],

      // NOTE: this is optional, you don't *need* the compiler

      [
        "@tamagui/babel-plugin",

        {
          components: ["tamagui"],

          config: "./tamagui.config.ts",

          logTimings: true,
        },
      ],

      // NOTE: this is only necessary if you are using reanimated for animations

      "react-native-reanimated/plugin",
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["./src"],
        },
      ],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          blacklist: null, // DEPRECATED
          whitelist: null, // DEPRECATED
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
  };
};
