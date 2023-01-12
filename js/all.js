import {apiPath} from './config.js';

$(function(){
    let locationDataList=[];
    $.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiPath}`)
    .done(res=>{
        console.log(res.records.location);
        locationDataList=res.records.location;
        const table = $('#weather-list');
        $(locationDataList[0].weatherElement[0].time).each(function(i,item){
            let timeStr = item.startTime.replace(/-/g,'/');
            timeStr=timeStr.split(' ');
            let title;
            switch(timeStr[1]){
                case '18:00:00':
                title=timeStr[0]+'晚間';
                break;
                case '06:00:00':
                title=timeStr[0]+'早上';
                break;
                case '12:00:00':
                title=timeStr[0]+'午間';
                break;
            }
            timeStr[1]
            $('.date').eq(i).text(`${title}`);
        })

        let str;
        $(locationDataList).each(function(_,item){
            str+=`<tr>
            <td>${item.locationName}</td>`
            $(item.weatherElement[0].time).each(function(i,img){
                let dayNight=img.startTime.match(/\b06:|\b12:/)?'day':'night';
                str+=`<td>${img.parameter.parameterName}${item.weatherElement[2].time[i].parameter.parameterName}-${item.weatherElement[4].time[i].parameter.parameterName}&deg;C
                <img src='./images/${dayNight}/${img.parameter.parameterValue}.svg' width='10%'>
                </td>`;
            })
            str+=`</tr>`;
        })
        table.append(str);

        table.DataTable({
            "language": {
                "lengthMenu": "顯示 _MENU_ 筆",
                "zeroRecords": "Nothing found - sorry",
                "info": "第 _PAGE_ 頁 共 _PAGES_ 頁",
                "infoEmpty": "No records available",
                "search":"搜尋:",
                "paginate": {
                    "2u4u ": "第一頁",
                    "last": "最後一頁",
                    "next": ">",
                    "previous":"<"
                },
            }
        });
    })
    .fail(err=>{
        console.log(err);
    })
    
})