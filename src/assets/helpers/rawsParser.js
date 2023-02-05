const raws = "00: ананас;01:нокиа;"


const parse = /(?:(?<q>(?:([а-яА-Я]|\w)+))\s*:\s*(?<a>(?:([а-яА-Я]|\w)+));)/g 
// const parse = /(?<pair>([а-яА-Я]|\w)+)/g 


const pairs = raws.matchAll(parse)


for (const pair of pairs) {
  console.log(pair)
}

`
  /
    (?<pair>
      (?<q>
        (?:
          ([а-яА-Я]|\w)+
        )
      )
      \s*:\s*
      (?<a>
        (?:
          ([а-яА-Я]|\w)+
        )
      )
      ;
    )
  /g 
`