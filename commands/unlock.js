exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send("Lütfen `Yönetici` yetkisi alın!");
  message.channel
    .overwritePermissions([
      {
        id: message.guild.roles.cache.find(a => a.name === "@everyone").id,
        allow: ["SEND_MESSAGES"]
      }
    ])
    .then(mse => {
      message.channel.send(
        `**${message.channel.name}** adlı kanal mesajlara açıldı!`
      );
    });
};

exports.help = { name: "unlock" };
