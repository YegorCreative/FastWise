// Custom weekly fasting schedules
// Each schedule has: goalHours, labels[], days[], periods[]
export const CUSTOM_SCHEDULES = {
    'power-week': {
        goalHours: 18,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            { eatPct: (20/24)*100, fastPct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
            { fast1Pct: 0, eatPct: (10/24)*100, fast2Pct: (14/24)*100 },
            { fast1Pct: (6/24)*100, eatPct: (14/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
            { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
            { fast1Pct: (6/24)*100, eatPct: (18/24)*100, fast2Pct: 0 }
        ],
        periods: [
            "Fri 8:00 PM – Sat 12:00 PM",
            "Sat 8:00 PM – Sun 12:00 PM",
            "Mon 10:00 AM – Tue 6:00 AM",
            "Tue 8:00 PM – Wed 12:00 PM",
            "Thu 12:00 AM – Fri 6:00 AM"
        ]
    },
    'power-week-2': {
        goalHours: 18,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            { eatPct: (20/24)*100, fastPct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
            { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
            { eatPct: (14/24)*100, fastPct: (10/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
            { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
            { eatPct: 100, fastPct: 0 }
        ],
        periods: [
            "Fri 8:00 PM – Sat 12:00 PM",
            "Sat 8:00 PM – Sun 12:00 PM",
            "Mon 12:00 AM – Tue 12:00 AM",
            "Tue 2:00 PM – Wed 12:00 PM",
            "Thu 12:00 AM – Fri 12:00 AM"
        ]
    },
    'ice-dive': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            { eatPct: (20/24)*100, fastPct: (4/24)*100 },
            { fast1Pct: (15/24)*100, eatPct: (5/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (14/24)*100, eatPct: (6/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (13/24)*100, eatPct: (7/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (11/24)*100, eatPct: (9/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (10/24)*100, eatPct: (14/24)*100, fast2Pct: 0 },
            { eatPct: 100, fastPct: 0 }
        ],
        periods: [
            "Fri 8:00 PM – Sat 3:00 PM",
            "Sat 8:00 PM – Sun 2:00 PM",
            "Sun 8:00 PM – Mon 1:00 PM",
            "Mon 8:00 PM – Tue 12:00 PM",
            "Tue 8:00 PM – Wed 11:00 AM",
            "Wed 8:00 PM – Thu 10:00 AM"
        ]
    },
    'fast-in-peace': {
        goalHours: 14,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            { eatPct: (20/24)*100, fastPct: (4/24)*100 },
            { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
            { fast1Pct: (10/24)*100, eatPct: (4/24)*100, fast2Pct: (10/24)*100 },
            { fast1Pct: (6/24)*100, eatPct: (18/24)*100, fast2Pct: 0 }
        ],
        periods: [
            "Fri 8:00 PM – Sat 10:00 AM",
            "Sat 8:00 PM – Sun 10:00 AM",
            "Sun 8:00 PM – Mon 10:00 AM",
            "Mon 8:00 PM – Tue 10:00 AM",
            "Tue 8:00 PM – Thu 10:00 AM",
            "Thu 2:00 PM – Fri 6:00 AM"
        ]
    },
    'weekend-faster-2': {
        goalHours: 14,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            { eatPct: (20/24)*100, fastPct: (4/24)*100 },
            { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (10/24)*100, eatPct: (10/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (10/24)*100, eatPct: (4/24)*100, fast2Pct: (10/24)*100 },
            { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
            { fast1Pct: (6/24)*100, eatPct: (18/24)*100, fast2Pct: 0 }
        ],
        periods: [
            "Fri 8:00 PM – Sat 10:00 AM",
            "Sat 8:00 PM – Sun 10:00 AM",
            "Sun 8:00 PM – Mon 10:00 AM",
            "Mon 8:00 PM – Tue 10:00 AM",
            "Tue 8:00 PM – Wed 10:00 AM",
            "Wed 2:00 PM – Fri 6:00 AM"
        ]
    },
    'feel-good': {
        goalHours: 18,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            { eatPct: 100, fastPct: 0 },
            { eatPct: (14/24)*100, fastPct: (10/24)*100 },
            { fast1Pct: (8/24)*100, eatPct: (16/24)*100, fast2Pct: 0 },
            { fast1Pct: (18/24)*100, eatPct: (6/24)*100, fast2Pct: 0 },
            { eatPct: 100, fastPct: 0 },
            { eatPct: (14/24)*100, fastPct: (10/24)*100 },
            { fast1Pct: (8/24)*100, eatPct: (16/24)*100, fast2Pct: 0 },
            { eatPct: 100, fastPct: 0 }
        ],
        periods: [
            "Sat 2:00 PM – Sun 8:00 AM",
            "Mon 12:00 AM – Mon 6:00 PM",
            "Wed 2:00 PM – Thu 8:00 AM"
        ]
    },
    'joy-in-the-evening': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            { eatPct: (20/24)*100, fastPct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (10/24)*100, fast2Pct: (2/24)*100 },
            { fast1Pct: (16/24)*100, eatPct: (6/24)*100, fast2Pct: (2/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (10/24)*100, fast2Pct: (2/24)*100 },
            { fast1Pct: (16/24)*100, eatPct: (6/24)*100, fast2Pct: (2/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (10/24)*100, fast2Pct: (2/24)*100 },
            { fast1Pct: (16/24)*100, eatPct: (8/24)*100, fast2Pct: 0 },
            { eat1Pct: (10/24)*100, fastPct: (6/24)*100, eat2Pct: (8/24)*100 }
        ],
        periods: [
            "Fri 8:00 PM – Sat 12:00 PM",
            "Sat 10:00 PM – Sun 4:00 PM",
            "Sun 10:00 PM – Mon 12:00 PM",
            "Mon 10:00 PM – Tue 4:00 PM",
            "Tue 10:00 PM – Wed 12:00 PM",
            "Wed 10:00 PM – Thu 4:00 PM",
            "Fri 10:00 AM – Fri 4:00 PM"
        ]
    },
    'dynamic-duo-breakfast': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            { eatPct: (20/24)*100, fastPct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
            { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
            { eatPct: (20/24)*100, fastPct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
            { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
            { eatPct: (20/24)*100, fastPct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 }
        ],
        periods: [
            "Fri 8:00 PM – Sat 12:00 PM",
            "Sun 12:00 AM – Mon 12:00 AM",
            "Mon 8:00 PM – Tue 12:00 PM",
            "Wed 12:00 AM – Thu 12:00 AM",
            "Thu 8:00 PM – Fri 12:00 PM"
        ]
    },
    'dynamic-duo-dinner': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            { eatPct: (14/24)*100, fastPct: (10/24)*100 },
            { fast1Pct: (6/24)*100, eatPct: (18/24)*100, fast2Pct: 0 },
            { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
            { eatPct: (14/24)*100, fastPct: (10/24)*100 },
            { fast1Pct: (6/24)*100, eatPct: (18/24)*100, fast2Pct: 0 },
            { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
            { eatPct: (14/24)*100, fastPct: (10/24)*100 },
            { fast1Pct: (6/24)*100, eatPct: (18/24)*100, fast2Pct: 0 }
        ],
        periods: [
            "Fri 2:00 PM – Sat 6:00 AM",
            "Sun 12:00 AM – Mon 12:00 AM",
            "Mon 2:00 PM – Tue 6:00 AM",
            "Wed 12:00 AM – Thu 12:00 AM",
            "Thu 2:00 PM – Fri 6:00 AM"
        ]
    },
    'dynamic-duo-plus': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            { eatPct: (20/24)*100, fastPct: (4/24)*100 },
            { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
            { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
            { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 }
        ],
        periods: [
            "Fri 8:00 PM – Sun 12:00 PM",
            "Sun 8:00 PM – Mon 12:00 PM",
            "Mon 8:00 PM – Wed 12:00 PM",
            "Wed 8:00 PM – Thu 12:00 PM",
            "Thu 8:00 PM – Fri 12:00 PM"
        ]
    },
    'spring-fasting': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            { eatPct: (20/24)*100, fastPct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 },
            { fast1Pct: 100, eatPct: 0, fast2Pct: 0 },
            { eatPct: (20/24)*100, fastPct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (8/24)*100, fast2Pct: (4/24)*100 },
            { fast1Pct: (12/24)*100, eatPct: (12/24)*100, fast2Pct: 0 }
        ],
        periods: [
            "Fri 8:00 PM – Sat 12:00 PM",
            "Sat 8:00 PM – Sun 12:00 PM",
            "Mon 12:00 AM – Tue 12:00 AM",
            "Tue 8:00 PM – Wed 12:00 PM",
            "Wed 8:00 PM – Thu 12:00 PM",
            "Thu 8:00 PM – Fri 12:00 PM"
        ]
    },
    'stone-age': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
            [ {type: 'eating', pct: (2/24)*100}, {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (2/24)*100} ],
            [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (6/24)*100} ],
            [ {type: 'eating', pct: (9/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (5/24)*100} ],
            [ {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (14/24)*100} ],
            [ {type: 'fasting', pct: (14/24)*100}, {type: 'eating', pct: (6/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (2/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (14/24)*100}, {type: 'eating', pct: (10/24)*100} ]
        ],
        periods: [
            "Fri 6:00 PM – Sat 12:00 AM",
            "Sat 2:00 AM – Sat 2:00 PM",
            "Sat 10:00 PM – Sun 6:00 PM",
            "Mon 9:00 AM – Mon 7:00 PM",
            "Tue 10:00 AM – Wed 2:00 PM",
            "Wed 8:00 PM – Thu 8:00 AM",
            "Thu 12:00 PM – Thu 6:00 PM",
            "Thu 8:00 PM – Fri 2:00 PM"
        ]
    },
    'aurora': {
        goalHours: 8,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (17/24)*100}, {type: 'fasting', pct: (7/24)*100} ],
            [ {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (8/24)*100} ],
            [ {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (8/24)*100} ],
            [ {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (8/24)*100} ],
            [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (14/24)*100} ],
            [ {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (16/24)*100} ]
        ],
        periods: [
            "Fri 5:00 PM – Sat 12:00 AM",
            "Sat 8:00 AM – Sat 4:00 PM",
            "Sun 8:00 AM – Sun 4:00 PM",
            "Mon 8:00 AM – Mon 4:00 PM",
            "Tue 12:00 AM – Tue 10:00 AM",
            "Wed 8:00 AM – Wed 4:00 PM",
            "Wed 8:00 PM – Thu 12:00 PM",
            "Thu 8:00 PM – Fri 8:00 AM"
        ]
    },
    'mega-week': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
            [ {type: 'fasting', pct: 100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (6/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (14/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (14/24)*100} ]
        ],
        periods: [
            "Fri 8:00 PM – Sat 12:00 PM",
            "Sat 8:00 PM – Sun 12:00 PM",
            "Mon 12:00 AM – Tue 12:00 PM",
            "Tue 8:00 PM – Wed 10:00 AM",
            "Wed 4:00 PM – Thu 6:00 AM",
            "Thu 8:00 PM – Fri 10:00 AM"
        ]
    },
    'mega-week-2': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (14/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ],
            [ {type: 'fasting', pct: 100} ],
            [ {type: 'eating', pct: (14/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ]
        ],
        periods: [
            "Fri 2:00 PM – Sat 6:00 AM",
            "Sun 12:00 AM – Mon 12:00 AM",
            "Mon 2:00 PM – Tue 6:00 AM",
            "Tue 2:00 PM – Wed 6:00 AM",
            "Wed 2:00 PM – Thu 6:00 AM",
            "Thu 2:00 PM – Fri 6:00 AM"
        ]
    },
    'brutal': {
        goalHours: 24,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: 100} ],
            [ {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (6/24)*100} ],
            [ {type: 'fasting', pct: 100} ],
            [ {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (6/24)*100} ],
            [ {type: 'fasting', pct: 100} ],
            [ {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (6/24)*100} ],
            [ {type: 'eating', pct: 100} ]
        ],
        periods: [
            "Fri 8:00 PM – Sun 12:00 AM",
            "Sun 10:00 AM – Sun 6:00 PM",
            "Mon 12:00 AM – Tue 12:00 AM",
            "Tue 10:00 AM – Tue 6:00 PM",
            "Wed 12:00 AM – Thu 12:00 AM",
            "Thu 10:00 AM – Thu 6:00 PM"
        ]
    },
    'job-for-experts': {
        goalHours: 24,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: 100} ],
            [ {type: 'fasting', pct: 100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ],
            [ {type: 'eating', pct: (17/24)*100}, {type: 'fasting', pct: (7/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
            [ {type: 'fasting', pct: 100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (11/24)*100}, {type: 'fasting', pct: (7/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ]
        ],
        periods: [
            "Sat 12:00 AM – Sun 6:00 AM",
            "Mon 5:00 PM – Tue 12:00 PM",
            "Wed 12:00 AM – Thu 6:00 AM",
            "Thu 5:00 PM – Fri 12:00 PM"
        ]
    },
    'ice-dive-2': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (15/24)*100}, {type: 'fasting', pct: (9/24)*100} ],
            [ {type: 'fasting', pct: (16/24)*100}, {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (6/24)*100}, {type: 'fasting', pct: (12/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (5/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (5/24)*100} ],
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (9/24)*100}, {type: 'eating', pct: (15/24)*100} ]
        ],
        periods: [
            "Fri 3:00 PM – Sat 4:00 PM",
            "Sat 8:00 PM – Sun 6:00 AM",
            "Sun 12:00 PM – Mon 12:00 PM",
            "Mon 8:00 PM – Tue 12:00 PM",
            "Tue 8:00 PM – Wed 6:00 AM",
            "Wed 11:00 AM – Wed 7:00 PM",
            "Thu 8:00 PM – Fri 9:00 AM"
        ]
    },
    'ice-dive-3': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (16/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
            [ {type: 'fasting', pct: (14/24)*100}, {type: 'eating', pct: (6/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (7/24)*100} ],
            [ {type: 'fasting', pct: (11/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (5/24)*100} ],
            [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (11/24)*100}, {type: 'fasting', pct: (3/24)*100} ],
            [ {type: 'fasting', pct: (9/24)*100}, {type: 'eating', pct: (13/24)*100}, {type: 'fasting', pct: (2/24)*100} ],
            [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (14/24)*100} ],
            [ {type: 'eating', pct: 100} ]
        ],
        periods: [
            "Fri 4:00 PM – Sat 2:00 PM",
            "Sat 8:00 PM – Sun 10:00 AM",
            "Sun 5:00 PM – Mon 11:00 AM",
            "Mon 7:00 PM – Tue 10:00 AM",
            "Tue 9:00 PM – Wed 9:00 AM",
            "Wed 10:00 PM – Thu 10:00 AM"
        ]
    },
    '3-days-immune-system-cure': {
        goalHours: 72,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
            [ {type: 'fasting', pct: 100} ],
            [ {type: 'fasting', pct: 100} ],
            [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (6/24)*100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ]
        ],
        periods: [
            "Sun 6:00 PM – Wed 6:00 PM"
        ]
    },
    'week-break': {
        goalHours: 0,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ]
        ],
        periods: []
    },
    'easy-fasting': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100} ],
            [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
            [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (14/24)*100} ],
            [ {type: 'eating', pct: 100} ]
        ],
        periods: [
            "Fri 8:00 PM – Sat 12:00 PM",
            "Sat 8:00 PM – Sun 12:00 PM",
            "Tue 7:00 AM – Tue 5:00 PM",
            "Wed 6:00 PM – Thu 10:00 AM"
        ]
    },
    'autophagy-week': {
        goalHours: 36,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: 100} ],
            [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (16/24)*100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ]
        ],
        periods: [
            "Sun 8:00 PM – Tue 8:00 AM"
        ]
    },
    'easy-fasting-2': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
            [ {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100} ],
            [ {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100} ],
            [ {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100} ],
            [ {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100} ],
            [ {type: 'eating', pct: 100} ]
        ],
        periods: [
            "Fri 8:00 PM – Sat 12:00 PM",
            "Sat 8:00 PM – Sun 12:00 PM",
            "Mon 7:00 AM – Mon 5:00 PM",
            "Tue 7:00 AM – Tue 5:00 PM",
            "Wed 7:00 AM – Wed 5:00 PM",
            "Thu 7:00 AM – Thu 5:00 PM"
        ]
    },
    'easy-fasting-3': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
            [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (6/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ],
            [ {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (7/24)*100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: (14/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (10/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ]
        ],
        periods: [
            "Fri 6:00 PM – Sat 8:00 AM",
            "Sat 2:00 PM – Sun 6:00 AM",
            "Mon 7:00 AM – Mon 5:00 PM",
            "Wed 2:00 PM – Thu 6:00 AM",
            "Thu 2:00 PM – Fri 6:00 AM"
        ]
    },
    'easy-fasting-4': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (8/24)*100} ],
            [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (6/24)*100} ],
            [ {type: 'eating', pct: (6/24)*100}, {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (12/24)*100} ],
            [ {type: 'eating', pct: 100} ]
        ],
        periods: [
            "Fri 8:00 PM – Sat 12:00 PM",
            "Sat 8:00 PM – Sun 12:00 PM",
            "Sun 8:00 PM – Mon 12:00 AM",
            "Tue 8:00 AM – Tue 4:00 PM",
            "Wed 12:00 AM – Wed 6:00 PM",
            "Thu 6:00 AM – Thu 12:00 PM"
        ]
    },
    'autophagy-week-2': {
        goalHours: 48,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
            [ {type: 'fasting', pct: 100} ],
            [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (6/24)*100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ],
            [ {type: 'eating', pct: 100} ]
        ],
        periods: [
            "Sun 6:00 PM – Tue 6:00 PM"
        ]
    },
    'relaxed-fasting': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
            [ {type: 'eating', pct: (9/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (5/24)*100} ],
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
            [ {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (16/24)*100} ],
            [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (12/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (16/24)*100} ]
        ],
        periods: [
            "Fri 8:00 PM – Sat 12:00 PM",
            "Sun 9:00 AM – Sun 7:00 PM",
            "Mon 8:00 PM – Tue 12:00 PM",
            "Wed 8:00 AM – Thu 8:00 AM",
            "Thu 8:00 PM – Fri 8:00 AM"
        ]
    },
    'relaxed-fasting-2': {
        goalHours: 16,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (19/24)*100}, {type: 'fasting', pct: (5/24)*100} ],
            [ {type: 'fasting', pct: (14/24)*100}, {type: 'eating', pct: (10/24)*100} ],
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
            [ {type: 'eating', pct: (9/24)*100}, {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (5/24)*100} ],
            [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
            [ {type: 'fasting', pct: (14/24)*100}, {type: 'eating', pct: (10/24)*100} ],
            [ {type: 'eating', pct: 100} ]
        ],
        periods: [
            "Fri 7:00 PM – Sat 2:00 PM",
            "Sun 8:00 PM – Mon 12:00 PM",
            "Tue 9:00 AM – Tue 7:00 PM",
            "Wed 6:00 PM – Thu 2:00 PM"
        ]
    },
    'relaxed-fasting-3': {
        goalHours: 14,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (11/24)*100}, {type: 'eating', pct: (13/24)*100} ],
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (11/24)*100}, {type: 'eating', pct: (9/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (14/24)*100}, {type: 'eating', pct: (10/24)*100} ],
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ]
        ],
        periods: [
            "Fri 8:00 PM – Sat 10:00 AM",
            "Sat 8:00 PM – Sun 11:00 AM",
            "Mon 8:00 PM – Tue 11:00 AM",
            "Tue 8:00 PM – Wed 2:00 PM",
            "Thu 8:00 PM – Fri 6:00 AM"
        ]
    },
    'relaxed-fasting-4': {
        goalHours: 14,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (16/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
            [ {type: 'fasting', pct: (7/24)*100}, {type: 'eating', pct: (10/24)*100}, {type: 'fasting', pct: (7/24)*100} ],
            [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (16/24)*100} ],
            [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
            [ {type: 'fasting', pct: (9/24)*100}, {type: 'eating', pct: (7/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (12/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (18/24)*100} ]
        ],
        periods: [
            "Fri 4:00 PM – Sat 6:00 AM",
            "Sat 4:00 PM – Sun 7:00 AM",
            "Sun 5:00 PM – Mon 8:00 AM",
            "Tue 6:00 PM – Wed 9:00 AM",
            "Wed 4:00 PM – Thu 6:00 AM",
            "Thu 4:00 PM – Fri 6:00 AM"
        ]
    },
    'resilience-booster': {
        goalHours: 22,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (2/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
            [ {type: 'fasting', pct: (6/24)*100}, {type: 'eating', pct: (14/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ],
            [ {type: 'eating', pct: (12/24)*100}, {type: 'fasting', pct: (12/24)*100} ],
            [ {type: 'fasting', pct: (10/24)*100}, {type: 'eating', pct: (14/24)*100} ],
            [ {type: 'eating', pct: 100} ]
        ],
        periods: [
            "Fri 8:00 PM – Sat 6:00 PM",
            "Sat 8:00 PM – Sun 12:00 PM",
            "Sun 4:00 PM – Mon 6:00 AM",
            "Mon 8:00 PM – Tue 12:00 PM",
            "Wed 12:00 PM – Thu 10:00 AM"
        ]
    },
    'resilience-booster-2': {
        goalHours: 22,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (18/24)*100}, {type: 'fasting', pct: (6/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
            [ {type: 'fasting', pct: (16/24)*100}, {type: 'eating', pct: (8/24)*100} ],
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (6/24)*100} ],
            [ {type: 'eating', pct: (12/24)*100}, {type: 'fasting', pct: (12/24)*100} ],
            [ {type: 'fasting', pct: (11/24)*100}, {type: 'eating', pct: (5/24)*100}, {type: 'fasting', pct: (8/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (12/24)*100} ]
        ],
        periods: [
            "Fri 6:00 PM – Sat 12:00 PM",
            "Sat 4:00 PM – Sun 4:00 PM",
            "Mon 8:00 PM – Tue 6:00 PM",
            "Wed 12:00 PM – Thu 11:00 AM",
            "Thu 4:00 PM – Fri 12:00 PM"
        ]
    },
    'resilience-booster-3': {
        goalHours: 20,
        labels: ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        days: [
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (12/24)*100}, {type: 'eating', pct: (8/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (20/24)*100}, {type: 'eating', pct: (4/24)*100} ],
            [ {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (4/24)*100}, {type: 'eating', pct: (4/24)*100}, {type: 'fasting', pct: (4/24)*100}, {type: 'eating', pct: (5/24)*100}, {type: 'fasting', pct: (3/24)*100} ],
            [ {type: 'fasting', pct: (18/24)*100}, {type: 'eating', pct: (6/24)*100} ],
            [ {type: 'eating', pct: (12/24)*100}, {type: 'fasting', pct: (4/24)*100}, {type: 'eating', pct: (8/24)*100} ],
            [ {type: 'eating', pct: (20/24)*100}, {type: 'fasting', pct: (4/24)*100} ],
            [ {type: 'fasting', pct: (8/24)*100}, {type: 'eating', pct: (16/24)*100} ]
        ],
        periods: [
            "Fri 8:00 PM – Sat 12:00 PM",
            "Sat 8:00 PM – Sun 8:00 PM",
            "Mon 4:00 AM – Mon 8:00 AM",
            "Mon 12:00 PM – Mon 4:00 PM",
            "Mon 9:00 PM – Tue 6:00 PM",
            "Wed 12:00 PM – Wed 4:00 PM",
            "Thu 8:00 PM – Fri 8:00 AM"
        ]
    }
};
