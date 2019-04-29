const worldMap = {
    'kq02-test-01' : [
        'kq02-test-02',
        'kq02-test-03'
    ],
    'kq02-test-02' : [
        'kq02-test-01',
        'kq02-test-06'
    ],
    'kq02-test-03' : [
        'kq02-test-07',
        'kq02-test-05'
    ],
    'kq02-test-06': [
        'kq02-test-05',
    ],
    'kq02-test-05': [
        'kq02-test-06'
     ],
     'kq02-test-07' : [
         'kq02-test-01',
         'kq02-test-04'
     ]
}

export default worldMap;