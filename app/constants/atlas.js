export default {
	'kq02-intro': {
		isDungeon: true,
		nodes:[]
	},
	'kq02-calgary-00': {
		isDungeon: false,
		nodes: ['kq02-calgary-01'],
		music: 'camp'
	},
	'kq02-calgary-01': {
		isDungeon: false,
		nodes: ['kq02-calgary-00','kq02-calgary-02','kq02-calgary-03','kq02-badlands-00'],
		music: 'camp'
	},
	'kq02-calgary-02': {
		isDungeon: true,
		nodes: ['kq02-pantheon-00','kq02-calgary-01','kq02-mountains-00'],
		music: 'theme-dungeon'
	},
	'kq02-calgary-03': {
		isDungeon: false,
		nodes: ['kq02-calgary-01'],
		music: 'camp'
	},
	'kq02-pantheon-00': {
		isDungeon: false,
		suppressWaypoints: true,
		nodes: [],
		music: 'theme-pantheon'
	},
	'kq02-palace-00': {
		isDungeon: false,
		suppressWaypoints: true,
		nodes: [],
		music: 'theme-ndp'
	},
	'kq02-mountains-00': {
		isDungeon: true,
		nodes: ['kq02-calgary-02','kq02-mountains-01','kq02-forest-00'],
		music: 'theme-dungeon'
	},
	'kq02-mountains-01': {
		isDungeon: true,
		nodes: ['kq02-mountains-00'],
		music: 'theme-dungeon'
	},
	'kq02-forest-00': {
		isDungeon: true,
		nodes: ['kq02-mountains-00'],
		music: 'theme-dungeon'
	},
	'kq02-badlands-00': {
		isDungeon: true,
		nodes: ['kq02-calgary-01','kq02-badlands-01'],
		music: 'theme-dungeon'
	},
	'kq02-badlands-01': {
		isDungeon: true,
		nodes: ['kq02-badlands-00'],
		music: 'theme-dungeon'
	},
	'kq02-caves-00': {
		isDungeon: true,
		nodes: ['kq02-caves-01'],
		music: 'theme-dungeon'
	},
	'kq02-caves-01': {
		isDungeon: false,
		nodes: ['kq02-edmonton-03','kq02-caves-00']
	},
	'kq02-edmonton-02': {
		isDungeon: false,
		nodes: ['kq02-edmonton-00'],
		music: 'camp'
	},
	'kq02-edmonton-01': {
		isDungeon: true,
		nodes: ['kq02-edmonton-00'],
		music: 'camp'
	},
	'kq02-edmonton-00': {
		isDungeon: false,
		nodes: ['kq02-edmonton-01','kq02-edmonton-02','kq02-edmonton-03','kq02-palace-00'],
		music: 'camp'
	},
	'kq02-edmonton-03': {
		isDungeon: false,
		nodes: ['kq02-caves-01'],
		music: 'camp'
	},
	'kq02-battle-01': {
		isDungeon: true,
		nodes: ['kq02-edmonton-01']
	},
	'kq02-battle-00': {
		isDungeon: true,
		nodes: []
	},
	'kq02-airship-00': {
		isDungeon: true,
		nodes: []
	},
	'kq02-truckstop-00': {
		isDungeon: false,
		nodes: ['kq02-airship-00']
	}
}