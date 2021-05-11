const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    const errorEmbed = new MessageEmbed().setColor("#00001");
  const errorEmbed2 = new MessageEmbed().setTitle("Bir hata oldu!");
  if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(
      errorEmbed.setTitle("Bir hata oldu!")
        .setDescription(`Yetki alarak dener misin?
**Örnek olarak**:
\`\`\`Yönetici\`\`\``)
    );
  }
  if (!args[0])
    return message.channel.send(
      errorEmbed.setTitle("Bir hata oldu!")
        .setDescription(`Kullanıcı etiketleyerek dener misin?
**Örnek olarak**:
\`\`\`?ban @üyeetiketi merhaba
?ban 686185592899633200 merhaba\`\`\``)
    );
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
\`\`\`?ban @üyeetiketi merhaba
?ban 686185592899633200 merhaba\`\`\``)
      );
  }

  if (message.author.id === member.id)
    return message.channel.send(
      new MessageEmbed()
        .setColor("#9c5cb2")
        .setTitle("Agaa beeeeeeeee!")
        .setDescription(`O kadar yürekli olamazsın.. 🙄`)
    );
  if (member.permissions.has("ADMINISTRATOR"))
    return message.channel.send(
      errorEmbed2.setDescription("Yönetici bir kullanıcıya karışamam!")
    );

  let reason;
  if (args[1]) reason = args[1];
  if (!args[1]) reason = "Bir açıklama yok.";

  message.channel
    .send(
      new MessageEmbed()
        .setColor("BLUE")
        .setDescription(
          `${member} adlı kişiye yasaklandı, sebep: **${reason}**`
        )
    )
    .then(mse => {
      message.guild.members.ban(member, { reason: reason });
    });
};

exports.help = { name: "ban" };
