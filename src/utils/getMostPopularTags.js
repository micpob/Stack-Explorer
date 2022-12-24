import fetch from 'node-fetch'

const url = `https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=askubuntu`

fetch(url)
      .then(response => response.json())
      .then(data => {
        //console.log('data:', data.items)
        const tagsArray = data.items.map((obj, index) => {
          const tagObject = {
            name: obj.name,
            selected: index < 3 ? true : false
          }
          return tagObject
        })
        tagsArray.sort((a, b) => a.name.localeCompare(b.name))
        console.log('tagsArray:', tagsArray)
      })