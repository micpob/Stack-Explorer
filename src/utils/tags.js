const allTags = {
  webdevfront: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Canvas'],
  webdevback: ['Node.js', 'PHP', 'SQL', 'MySql', 'GraphQL'],
  devops: ['docker', 'kubernetes', 'SSH', 'FTP', 'AWS'],
  database: ['relational', 'nosql', 'mongo', 'mysql', 'postgresql']
}

const defaultTags = {
  stackoverflow: [
    {name: 'HTML', selected: true}, 
    {name: 'CSS', selected: true}, 
    {name: 'JavaScript', selected: true}, 
    {name: 'Reactjs', selected: true}, 
    {name: 'SQL', selected: false}, 
    {name: 'mongo', selected: false}, 
    {name: 'PHP', selected: false}, 
    {name: 'Node.js', selected: false}, 
  ]
} 

export default {allTags, defaultTags}