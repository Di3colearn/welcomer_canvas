const discord = require('discord.js');
const config = require('./config.json')
const client = new discord.Client();
const Canvas = require("canvas");

client.once('ready', () => {
    console.log('Ready!');
});

client.on('guildMemberAdd', async member => {
    let welcomeChannel = client.channels.cache.get("copy id welcome channel")
    let targetchannel = 'copy id mention channel'
    if (welcomeChannel) {

        let welcomeEmbed = new discord.MessageEmbed()

        if (member.user.bot) {
            welcomeEmbed.setColor('#ffff00')
            welcomeEmbed.setAuthor(`${member.guild.name}`)
            welcomeEmbed.setDescription(`<@${member.user.id}> Hello`)
            welcomeEmbed.setThumbnail(member.user.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            welcomeEmbed.setFooter(`${client.user.username}`)
            welcomeChannel.send(welcomeEmbed)
        } else {
            welcomeEmbed.setColor('#ffff00')
            welcomeEmbed.setAuthor(`${member.guild.name}`)
            welcomeEmbed.setDescription(`سلام <@${member.user.id}>  \n \n به سرور ما خوش اومدی حتما یه سر بزن به چنل  ${member.guild.channels.cache.get(targetchannel).toString()} امیدوارم از سرورمون خوشت بیاد\n \n   تعداد اعضا : ${member.guild.memberCount}`)
            welcomeEmbed.setThumbnail(member.user.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            welcomeEmbed.setFooter(`${client.user.username}`)
            welcomeChannel.send(welcomeEmbed)
            const canvas = Canvas.createCanvas(1100, 500);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage(`./card.png`);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            var textString3 = `${member.user.tag}`;
            if (textString3.length >= 14) {
                ctx.font = 'bold 45px Sans';
                ctx.fillStyle = '#ff4d00';
                ctx.fillText(textString3, 270, canvas.height / 2 + 180);
            }
            else {
                ctx.font = 'bold 65px Sans';
                ctx.fillStyle = '#ff4d00';
                ctx.fillText(textString3, 270, canvas.height / 2 + 180);
            }
            var textString4 = `Member #${member.guild.memberCount}`;
            ctx.font = 'bold 50px Sans';
            ctx.fillStyle = '#161515';
            ctx.fillText(textString4, 400, canvas.height / 2 + 230);
            ctx.beginPath();
            ctx.arc(550.5, 190, 130, 0, Math.PI * 2, true);//position of img
            ctx.closePath();
            ctx.clip();
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
            ctx.drawImage(avatar, 410, 60, 275, 275);
            const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
            welcomeChannel.send(attachment)
        }
    } else {
        console.log("Welcome Channel Yaft Nashod")
    }
})
client.login(config.token);

