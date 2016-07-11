PlayList.delete_all
Song.delete_all
User.delete_all

u1 = User.create!({email: 'wojtek@gmail.com', password:'wojtek', password_confirmation:'wojtek'})

p1 = PlayList.create({name: "all songs", user_id: u1.id})
p2 = PlayList.create({name: "heavy", user_id: u1.id})


Song.create({:artist => "rob bailey", :album => "southpaw soundtrack", genre: "rap", title: "beast", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Beast.mp3", play_list_id: p1.id})

Song.create({artist: "the brothers bright", album: "the brothers bright", genre: "rock", title: "blood on my name", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Blood+on+my+name+-+The+Brothers+Bright.mp3", play_list_id: p1.id})

 Song.create({artist: "calvin harris", album: "this is what you came for in to you", genre: "pop", title: "this is what you came for in to you", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Calvin+Harris%2C+Rihanna%2C+Ariana+Grande+-+This+Is+What+You+Came+ForInto+You.mp3", play_list_id: p1.id})

Song.create({artist: "disturbed", album: "the sickness", genre: "rock", title: "shout", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Disturbed+-+Shout..mp3", play_list_id: p1.id})

Song.create({artist: "disturbed", album: "screaming bloody murder", genre: "rock", title: "blood in my eyes", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Disturbed%2C+Godsmack%2C+Limp+Bizkit+Blood+In+My+Eyes.mp3", play_list_id: p1.id})

Song.create({artist: "eminem", album: "relapse", genre: "rap", title: "3am", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Eminem+-+3+a.m..mp3", play_list_id: p1.id})

Song.create({artist: "fort minor", album: "never back down", genre: "rap", title: "remember the name", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Fort+Minor+Remember+the+name.mp3", play_list_id: p1.id})

Song.create({artist: "limp bizkit", album: "chocolate starfish and the hot dog flavored water", genre: "rock", title: "rollin", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Limp+Bizkit+-+Rollin%27+(Air+Raid+Vehicle).mp3", play_list_id: p1.id})

Song.create({artist: "red hot chilli peppers", album: "by the way", genre: "rock", title: "can't stop", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Red+Hot+Chili+Peppers+-+Can%27t+Stop+Official+Music+Video.mp3", play_list_id: p1.id})

Song.create({artist: "sia", album: "this is acting", genre: "pop", title: "cheap thrills", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Sia+Ft+Sean+Paul+Cheap+Thrills.mp3", play_list_id: p1.id})

Song.create({artist: "the black eyed peas", album: "the e.n.d", genre: "pop", title: "i gotta feeling", url: "https://s3-eu-west-1.amazonaws.com/lemusic/The+Black+Eyed+Peas+-+I+Gotta+Feeling.mp3", play_list_id: p1.id})



Song.create({:artist => "rob bailey", :album => "southpaw soundtrack", genre: "rap", title: "beast", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Beast.mp3", play_list_id: p2.id})

Song.create({artist: "the brothers bright", album: "the brothers bright", genre: "rock", title: "blood on my name", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Blood+on+my+name+-+The+Brothers+Bright.mp3", play_list_id: p2.id})

Song.create({artist: "disturbed", album: "the sickness", genre: "rock", title: "shout", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Disturbed+-+Shout..mp3", play_list_id: p2.id})

Song.create({artist: "disturbed", album: "screaming bloody murder", genre: "rock", title: "blood in my eyes", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Disturbed%2C+Godsmack%2C+Limp+Bizkit+Blood+In+My+Eyes.mp3", play_list_id: p2.id})

Song.create({artist: "fort minor", album: "never back down", genre: "rap", title: "remember the name", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Fort+Minor+Remember+the+name.mp3", play_list_id: p2.id})

Song.create({artist: "limp bizkit", album: "chocolate starfish and the hot dog flavored water", genre: "rock", title: "rollin", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Limp+Bizkit+-+Rollin%27+(Air+Raid+Vehicle).mp3", play_list_id: p2.id})


Song.create({artist: "red hot chilli peppers", album: "by the way", genre: "rock", title: "can't stop", url: "https://s3-eu-west-1.amazonaws.com/lemusic/Red+Hot+Chili+Peppers+-+Can%27t+Stop+Official+Music+Video.mp3", play_list_id: p2.id})















