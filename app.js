
const Discord = require("discord.js");

const client = new Discord.Client();
 
const config = require("./config.json");

client.on("message", async message => {

  if(message.author.bot) return;
  

  if(message.content.indexOf(config.prefix) !== 0) return;
  
 
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  

  client.user.setGame(":x:" , "http://www.twitch.tv/zserifan")
  if(command === "ping") {
    
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }


  Client.on("guildMemberAdd", member => {
    member.guild.defaultChannel.send("Welcome to: " + member.guild.name + " Hope you enjoy it here")
 });
 
 Client.on("guildMemberRemove", member => {
    member.guild.defaultChannel.send("Goodbye: " + member.user.username + " from " + member.guild.name)
 });
 
 Client.on("guildCreate", guild => {
   console.log("Some one added the test bot to a server created by: " + guild.owner.user.username)
 });


  if (command === "ping") {
		message.channel.send(`Pong! Time took: ${Date.now() - message.createdTimestamp} ms`);
  } 
  
  
  if(command === "say") {
 
    const sayMessage = args.join(" ");
   
    message.delete().catch(O_o=>{}); 
   
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(":x: Nu ai permisiunea de a folosi aceasta comanda");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("```Pune un nume valabil al acestui server.```");
    if(!member.kickable) 
      return message.reply("```Nu pot interzice acest utilizator e mai puternic ca mine... :x:```");
    

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Va rugam puneti un motiv pentru ban.!");
    

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag}A fost interzis de catre ${message.author.tag}pentru ca: ${reason}`);

  }
  
  if(command === "ban") {
  
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(" Nu ai permisiunea de a folosi aceasta comanda");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("```Pune un nume valabil al acestui server.```");
    if(!member.bannable) 
      return message.reply("```Nu pot interzice acest utilizator e mai puternic ca mine... :x:```");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Va rugam puneti un motiv pentru ban.!");
    
    await member.ban(reason)
      .catch(error => message.reply(```Imi pare rau ${message.author} nu am putut interzice din cauza : ${error}```));
    message.reply(`${member.user.tag} A fost interzis de catre ${message.author.tag} pentru ca: ${reason}`);
  }
  
  if(command === "purge") {

    const deleteCount = parseInt(args[0], 10);
  
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Folositi un numar de la 2 pana la 100 pentru a sterge mesajele.");
  
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(```Mesajele nu s-au putut sterge sin cauza: ${error}```));
  }


  if (command === "help") {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor("help", client.user.avatarURL)
    .addField("!help", "```Pentru a vedea lista comenzilor actuale.```")
    .addField("!ban", "```Pentru a interzice un utilizator de pe server.```")
    .addField("!ping", "```Pentru a vedea pingul unui utilizator.```")
    .addField("!kick", "```Pentru a alunga un utilizator de pe server.```")
    .addField("!userinfo", "```Pentru a vedea informatii despre utilizator.```")
    .addField("!say [text]", "```Va face botul sa spuna ceva.```")
    .addField("!anunt [text]", "```Va face botul să spună un anunț și să-i anunte pe toți```")
    .addField("!avatar", "```Pentru a vedea imaginea utilizatorului.```")
    .addField("!serverinfo", "```Pentru a vedea informatiile serverului.```")
    message.channel.send({embed})
}

if (command === "comenzi") {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor("help", client.user.avatarURL)
  .addField("!help", "```Pentru a vedea lista comenzilor actuale.```")
  .addField("!ban", "```Pentru a interzice un utilizator de pe server.```")
  .addField("!ping", "```Pentru a vedea pingul unui utilizator.```")
  .addField("!kick", "```Pentru a alunga un utilizator de pe server.```")
  .addField("!userinfo", "```Pentru a vedea informatii despre utilizator.```")
  .addField("!say [text]", "```Va face botul sa spuna ceva.```")
  .addField("!anunt [text]", "```Va face botul să spună un anunț și să-i anunte pe toți```")
  .addField("!avatar", "```Pentru a vedea imaginea utilizatorului.```")
  .addField("!serverinfo", "```Pentru a vedea informatiile serverului.```")
  message.channel.send({embed})
}


if (command === "ajutor") {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor("help", client.user.avatarURL)
  .addField("!help", "```Pentru a vedea lista comenzilor actuale.```")
  .addField("!ban", "```Pentru a interzice un utilizator de pe server.```")
  .addField("!ping", "```Pentru a vedea pingul unui utilizator.```")
  .addField("!kick", "```Pentru a alunga un utilizator de pe server.```")
  .addField("!userinfo", "```Pentru a vedea informatii despre utilizator.```")
  .addField("!say [text]", "```Va face botul sa spuna ceva.```")
  .addField("!anunt [text]", "```Va face botul să spună un anunț și să-i anunte pe toți```")
  .addField("!avatar", "```Pentru a vedea imaginea utilizatorului.```")
  .addField("!serverinfo", "```Pentru a vedea informatiile serverului.```")
  message.channel.send({embed})
}


if (command === "anunt") {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        const text = args.join(" ")
        if (text.length < 1) return message.channel.send("```Nu pot anunța nimic```");
        
        const embed = new Discord.RichEmbed()
        .setAuthor("anunt", client.user.avatarURL)
        .setColor(0x954D23)
        .setTitle("```Anunt Important:```")
        .setDescription(text);
        message.channel.send("@everyone")
        message.channel.send({embed})
    }
}


if (command === "serverinfo") {
  let icon = "icon"
  if(!message.guild.iconURL){
  icon = message.author.avatarURL
  } else {
  icon = message.guild.iconURL
  }
  
      const embed = new Discord.RichEmbed()
      .setAuthor(message.guild, icon)
      .addField("ID", message.guild.id, true)
      .addField("Name", message.guild, true)
      .addField("Owner", message.guild.owner.user.tag, true)
      .addField("Region", message.guild.region, true)
      .addField("Channels", message.guild.channels.size, true)
      .addField("Members", message.guild.memberCount, true)
      .addField("Humans", message.guild.members.filter(m => !m.user.bot).size, true)
      .addField("Bots", message.guild.members.filter(m => m.user.bot).size, true)
      .addField("Online", message.guild.members.filter(m => m.presence.status !== 'offline').size, true)
      .addField("Roles", message.guild.roles.size, true)
      .addField("Role List", message.guild.roles.map(r => r.name).join(", "))
      .setTimestamp(message.guild.createdAt)
      .setFooter("Server Created")
      .setColor("RANDOM")
          message.channel.sendEmbed(embed)
}

if (command === "avatar") {
  const myavatar = new Discord.RichEmbed()
  .setImage(message.author.avatarURL)
  .setColor("RANDOM");
  if(message.mentions.users.size < 1) return message.channel.sendEmbed(myavatar)
  const avatar = new Discord.RichEmbed()
  .setImage(message.mentions.users.first().avatarURL)
  .setColor("RANDOM")
  message.channel.sendEmbed(avatar)
}
});
client.login(config.token);
