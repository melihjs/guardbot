const Discord = require('discord.js');

exports.run = async (client, message, args) => {
        if (!message.member.permissions.has("BAN_MEMBERS")) {
      let nopermsembed = new Discord.MessageEmbed()
        .setDescription(
          "Senin `Üyeleri Yasakla` yetkin yok, lütfen bir yetkiliyle iletişime geç!"
        )
        .setColor("#2C2F33");
      message.channel.send(nopermsembed);

      return;
    }
    
    
        let unbanned = args[0];
    
    // MESSAGES

    if (!unbanned) {
      let unbaninfoembed = new Discord.MessageEmbed()
        .setTitle("Command: unban")
        .setDescription(
          `**Açıklama:** Bir kullanıcının yasağını kaldırma. \n` +
            "**Komut:**\n" +
            "" +
            "**Kullanım:**\n" +
            "-unban [kullanıcı_id]\n" +
            "**Örnek:** \n" +
            "?unban "+client.user.id
        )
        .setColor("#2C2F33");
      message.channel.send(unbaninfoembed);

      return;
    }
  let member = await client.users.fetch(unbanned);
  let ban = await message.guild.fetchBans();
    if (!ban.get(member.id)) {
      let notbannedembed = new Discord.MessageEmbed()
        .setDescription("Bu kullanıcı daha önce hiç yasaklanmamış!")
        .setColor("#2C2F33");
      message.channel.send(notbannedembed);

      return;
    }

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
      let botnoperms = new Discord.MessageEmbed()
        .setDescription(
          "Benim `Üyeleri Yasakla` yetkim yok, lütfen bir yetkiliyle iletişime geç!"
        )
        .setColor("#2C2F33");
      message.channel.send(botnoperms);

      return;
    }

    var user = ban.get(member.id);
    message.guild.members.unban(member);
    let successfullyembed = new Discord.MessageEmbed()
      .setTitle(`${member.tag} adlı kullanıcının yasağı kaldırıldı!`)
      .setColor("#2C2F33");

    message.channel.send(successfullyembed);
};

exports.help = { name: "unban" };