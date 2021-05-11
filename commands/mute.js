const ms = require("ms");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const errorEmbed = new MessageEmbed().setColor("#00001");
const errorEmbed2 = new MessageEmbed().setTitle("Bir hata oldu!");
  if(!args[0]) return message.channel.send(errorEmbed.setTitle('Bir hata oldu!').setDescription(`Kullanıcı etiketleyerek dener misin?
**Örnek olarak**:
\`\`\`?mute @üyeetiketi 1m merhaba
?mute 686185592899633200 1m merhaba\`\`\``));
  let member;
  if (message.mentions.members.first()) {
    member = message.mentions.members.first();
  } else if (args[0]) {
    member = message.guild.members.cache.get(args[0]);
    if (!member)
      return message.channel.send(
        errorEmbed.setTitle("Bir hata oldu!")
          .setDescription(`Kullanıcı etiketleyerek dener misin?
**Örnek olarak**:
\`\`\`?mute @üyeetiketi 1m merhaba
?mute 686185592899633200 1m merhaba\`\`\``)
      );
  }

  if(message.author.id === member.id) return message.channel.send(new MessageEmbed().setColor('#9c5cb2').setTitle('Agaa beeeeeeeee!').setDescription(`O kadar yürekli olamazsın.. 🙄`))
if(member.permissions.has('ADMINISTRATOR')) return message.channel.send(errorEmbed2.setDescription('Yönetici bir kullanıcıya karışamam!'));

if(!args[1]) return message.channel.send(errorEmbed.setTitle('Bir hata oldu!')
.setDescription(`${message.author} **Süre** Belirtmeyi unutma lütfen! \`1s & 1m & 1h & 1d\` kullanarak dener misin?
**Örnek olarak**:
\`\`\`?mute @üyetiketi 1m merhaba\`\`\``));

let cooldown = ms(args[1]);
let reason;
if(args[2]) reason = args[2];
if(!args[2]) reason = 'Bir açıklama yok.';

message.guild.channels.cache.filter(a => a.type === 'text').forEach(s => {
s.overwritePermissions([{ id: member.id, deny: ['SEND_MESSAGES'] }]);
});
  
  message.channel.send(new MessageEmbed().setColor("BLUE").setDescription(`${member} adlı kişiye mute atıldı, süre: **${args[1]}**, sebep: **${reason}**`))
  
  setTimeout(() => {
    message.guild.channels.cache
      .filter(a => a.type === "text")
      .forEach(s => {
        s.overwritePermissions([{ id: member.id, null: ["SEND_MESSAGES"] }]);
      });
  }, cooldown);
};

exports.help = { name: "mute" };
