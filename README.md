Image Search Abstraction Layer
==========================

API for searching Google Images.

Example Search:
------------

/search/microchip?page=1

Response Sample:
```
{
type: "image/jpeg",
width: 1600,
height: 1066,
size: 331921,
url: "https://2.bp.blogspot.com/-sBSuFvS0kxs/WaDpW91HAvI/AAAAAAAAAAo/QraC-uPvfMskkMbcMeL6xifnMCp3P5eswCLcBGAs/s1600/We%2BAll%2BRely%2Bon%2BThem%252C%2BBut%2BHow%2BDoes%2Ba%2BMicrochip%2BWork.jpg",
thumbnail: {
url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkCACGrUO_X_Xmi0NmzIgRDmrmLZWF0E0cmuZhRlYkx3Zsm5pIY9VDuCAQ",
width: 150,
height: 100
},
description: "Breakthrough" microchip technology helps to heal bodys wounds ...",
parentPage: "http://www.biologylove.com/2017/08/breakthrough-microchip-technology-helps.html"
}
```

Latest Searches:
------------

/api/latest

```
[{
term: "microchip",
when: "2018-04-08T13:23:50.302Z",
_id: "zitNV5lQeHvLTlkR"
}]
```