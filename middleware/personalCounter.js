const mongoose = require('mongoose');
const ListIp = require('../model/ListIp');
const IpList2 = require('../model/IpList2');
const Statistic = require('../model/Statistic');

const personalCounter = async (req, res, next) => {
    try {
        await mongoose.connect(process.env.DATABASE_URI_COUNTER, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.log(err);
    };
    
    const date = format(new Date(), 'yyyy-MM-dd');
    
    result = ListIp.deleteMany({date: { $ne: date}});
    
    result = await Statistic.updateMany({date: { $ne: date}}, {hosts: 0, hits: 0});
    result = await Statistic.updateMany({}, {date:  date});
    
    const ip = req.socket.remoteAddress.split(':').at(-1);

    row = await ListIp.count({ip});

    if(row > 0) {
        
        // $result = mysql_query("SELECT `hosts`, `hits`, `total` FROM
        // `statistics`");
        // 4. $row = mysql_fetch_array($result);
        row = await Statistic.findOne().exec();
        // 5. $new_hits = ++$row['hits'];
        new_hits = ++row.hits;
        // 6. $new_total = ++$row['total'];
        new_total = ++row.total;
        // 7. mysql_query("UPDATE `statistics` SET `hits`=\"$new_hits\", `to-
        // tal`=\"$new_total\"");
        result = await Statistic.updateMany({}, {hits: new_hits, total: new_total});
        // 8. output_img($row['hosts'], $new_hits, $new_total);
        res.json({"row.hosts": row.hosts,"new_hits": new_hits,"new_total": new_total});

    } else {
        // mysql_query("INSERT INTO `list_ip` (`ip`, `date`) VALUES
        // (\"$ip\", \"$date\")") or die(mysql_error());
        const result = await ListIp.create({
            "ip": ip,
            "date": date
        });
        // 4. $result = mysql_query("SELECT `hosts`, `hits`, `total` FROM
        // `statistics`");
        // 5. $row = mysql_fetch_array($result)
        row = await Statistic.findOne().exec();
        // $new_hosts = ++$row['hosts'];
        new_hosts = ++row.hosts;
        // 7. $new_hits = ++$row['hits'];
        new_hits = ++row.hits;
        // 8. $new_total = ++$row['total'];
        new_total = ++row.total;
        // 9. mysql_query("UPDATE `statistics` SET `hosts`=\"$new_hosts\",
        // `hits`=\"$new_hits\", `total`=\"$new_total\"");
        result = await Statistic.updateMany({}, {hosts: new_hosts, hits: new_hits, total: new_total});
        // 10. output_img($new_hosts, $new_hits, $new_total)
        res.json({"new_hosts": new_hosts, "new_hits": new_hits,"new_total": new_total});
    }

    // $res = mysql_query("SELECT `ip`, `count` FROM `ip_list2` WHERE
    // (`ip`=\"$ip\")");
    // 2. $row = mysql_num_rows($res);
    row = await IpList2.count({ip});
    // 3. if ($row == 0)
    // 4. {
    if(row == 0) {
    // 5. mysql_query("INSERT INTO `ip_list2` (`ip`, `count`) VALUES
    // (\"$ip\", 1)");
        const result = await IpList2.create({
            "ip": ip,
            "count": 1
        });
    }
    // 6. $res = mysql_query("SELECT `ip`, `count` FROM `ip_list2`");
    //res = 
    // 7. while ($row = mysql_fetch_array($res))
    // 8. {
    // 9. echo 'IP: '.$row['ip'].' Count: '.$row['count'].'\n';
    // 10. }
    // 11.
    // 12. } else
    // 13. {
    // 14. $res = mysql_query("SELECT `ip`, `count` FROM `ip_list2` WHERE
    // (`ip`=\"$ip\")");
    // 15. $row = mysql_fetch_array($res);
    // 16. $count = ++$row['count'];
    // 17. mysql_query("UPDATE `ip_list2` SET `count`=\"$count\" WHERE
    // (`ip`=\"$ip\") ");
    // 18. $res = mysql_query("SELECT `ip`, `count` FROM `ip_list2`");
    // 19. while ($row = mysql_fetch_array($res))
    // 20. {
    // 21. echo 'IP: '.$row['ip'].' Count: '.$row['count'].'\n';
    // 22. }
    // 23. }

}
