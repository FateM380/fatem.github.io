const Majsoul_Plus = {};
Majsoul_Plus.$ = {
  codeVersion: "v0.10.204.w",
  hasLauncher: false,
  pre: [],
  post: ["HloadingCG_LF_green"],
  launcher: ""
};
[
  ...Majsoul_Plus.$.pre,
  ...Majsoul_Plus.$.post,
  ...(Majsoul_Plus.$.hasLauncher ? [Majsoul_Plus.$.launcher] : [])
].forEach(ext => (Majsoul_Plus[ext] = {}));

(async () => {
  const $ = Majsoul_Plus.$;
  await Promise.all(
    ["console", "fetch"].map(name =>
      addScript(`majsoul_plus/plugin/${name}.js`)
    )
  );

  await addScript(`majsoul_plus/resourcepack/code.js`);

  await Promise.all(
    $.pre.map(ext => addScript(`majsoul_plus/extension/scripts/${ext}/`))
  );

  if ($.hasLauncher) {
    await addScript(`majsoul_plus/extension/scripts/${$.launcher}/`);
  } else {
    new GameMgr();
  }

  await Promise.all(
    $.post.map(ext => addScript(`majsoul_plus/extension/scripts/${ext}/`))
  );
})();

function addScript(url) {
  return new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = url;
    tag.async = false;
    tag.onload = resolve;
    tag.onerror = reject;
    document.head.appendChild(tag);
  });
}