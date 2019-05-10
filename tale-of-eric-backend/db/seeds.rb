# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Weapon.create([
    {name: 'Take A Shower', image: 'https://imgur.com/a/5fpAMjW', damage: 1}
])

Enemy.create([
    {name: 'Mod 1 Student', image: 'https://imgur.com/a/UpQH6Ir', health: 1},
    {name: 'Mode 2 Student', image: 'https://imgur.com/a/UpQH6Ir', health: 2},
    {name: 'Mode 3 Student', image: 'https://imgur.com/a/UpQH6Ir', health: 2},
    {name: 'Mode 4 Student', image: 'https://imgur.com/a/UpQH6Ir', health: 3},
    {name: 'Mode 5 Student', image: 'https://imgur.com/a/UpQH6Ir', health: 4}
])
