const { Client, Collection, MessageEmbed } = require("discord.js");
const loader = require("fs");
const client = new Client();
require("./util/Loader.js")(client);
client.commands = new Collection();

client.on('ready', () => {
  console.log("bot bağlandı")
});

loader.readdir('./commands', (err, files) => {
  if(err) console.error(err);
  console.log(`${files.length} adet komut yüklenecek!`);
  files.forEach(f => {
    let cmd = require(`./commands/${f}`);
    console.log(`${cmd.help.name} komutu yüklendi!`);
    client.commands.set(cmd.help.name, cmd)
  });
});

client.on("message", async message => {
  if (message.channel.type !== "text") return;
  const blacklist = [
    "oç",
    "amk",
    "ananı sikiyim",
    "ananıskm",
    "piç",
    "amk",
    "amsk",
    "sikim",
    "sikiyim",
    "orospu çocuğu",
    "piç kurusu",
    "kahpe",
    "orospu",
    "sik",
    "yarrak",
    "amcık",
    "amık",
    "yarram",
    "sikimi ye",
    "mk",
    "mq",
    "aq",
    "amq"
  ];
  const uyarılar = [
    "İt is Haram bRo! 🤥",
    "Az düzgün konuş günaha girme! 🤧",
    "Aaaa ayıp dostum! 🥴",
    "Vayy ahlaksız çocuk! 🙀",
    "Tövbesteyşin! 🤫"
  ];
  let uyarımesaj = uyarılar[Math.floor(Math.random() * uyarılar.length)];
  let content = message.content.split(" ");

  content.forEach(kelime => {
    if (blacklist.some(küfür => küfür === kelime)) {
      if (message.member.permissions.has("BAN_MEMBERS")) return;
      message.delete();
      message.channel.send(
        new MessageEmbed()
          .setTitle("Küfür Kısıtlı")
          .setDescription(`${message.author} ${uyarımesaj}`)
          .setColor("RED")
      );
    }
  });
});

client.on("message", async message => {
  if (message.channel.type !== "text") return;
  const blacklist = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    "net",
    ".rf.gd",
    ".az",
    ".party",
    "discord.gg"
  ];
  const uyarılar = [
    "Kesinlikle yapma bunu okey? ♿",
    "Seni gidi çakal seni hıı! 🍌",
    "Ooo sanırım kendisini uyanık sandı? 🐍",
    "Şşş reklam kötü bir şey dostum! 🎭",
    "Haddini bil ya da çık git sunucudan! ⚰️"
  ];
  let uyarımesaj = uyarılar[Math.floor(Math.random() * uyarılar.length)];
  if (blacklist.some(a => message.content.includes(a))) {
    if (message.member.permissions.has("BAN_MEMBERS")) return;
    message.delete();
    message.channel.send(
      new MessageEmbed()
        .setTitle("Reklam Kısıtlı")
        .setDescription(`${message.author} ${uyarımesaj}`)
        .setColor("RED")
    );
  }
});

client.on("message", async message => {
  if (message.channel.type !== "text") return;
  const blacklist = [
    "napim",
    "NAPİM",
    "NaPiM",
    "nApİm",
    "naPiM",
    "NApİM",
    "napiM",
    "NAPIM"
  ];
  if (blacklist.some(a => message.content.includes(a))) {
    if (message.member.permissions.has("BAN_MEMBERS")) return;
    message.delete();
    message.channel.send(
      new MessageEmbed()
        .setTitle("Napim Kısıtlı")
        .setDescription(`${message.author} Kesinlikle yapma bunu okey? ♿`)
        .setColor("RED")
    );
  }
});

client.login(require("./config.json").token); //config.json'a token gir!
