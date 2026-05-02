export const FASTING_STAGES = [
    {
        id: 0,
        label: 'Fasting has started',
        sublabel: 'Started now',
        triggerHours: 0,
        bodyStage: '0',
        icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
        title: 'Start of the fast',
        subtitle: 'You feel fairly normal during the first few hours. Your body is busy digesting.',
        bullets: [
            'The absorbed nutrients are broken down into their components and enter the blood via the small intestine.',
            'If your previous meal was high in carbohydrates, you may feel a little worn out.',
            'Carbohydrates are converted into sugar molecules (glucose) and cause blood sugar levels to rise.',
            'The pancreas secretes the hormone insulin to lower blood sugar levels. Insulin levels rise.'
        ]
    },
    {
        id: 1,
        label: 'Insulin levels',
        sublabel: 'drop after 4 h',
        triggerHours: 4,
        bodyStage: '1',
        icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v6m0 0c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"/></svg>`,
        title: 'Insulin levels',
        subtitle: 'After insulin levels rise, they fall again. You may feel hungry.',
        bullets: [
            'A large glass of water often helps with these hunger pangs. After a short time it will subside on its own.',
            'Insulin initially transports glucose to the muscles and liver as a quick source of energy, where it is stored as glycogen.',
            'Insulin also regulates fat metabolism: It favors the formation of body fat and suppresses fat burning.'
        ]
    },
    {
        id: 2,
        label: 'Blood sugar',
        sublabel: 'normalizes after 8 h',
        triggerHours: 8,
        bodyStage: '2',
        icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/><path d="M12 8v4l3 3"/></svg>`,
        title: 'Blood sugar',
        subtitle: 'Blood sugar levels return to normal. The body slowly calms down.',
        bullets: [
            'The body uses glycogen stores to produce glucose and meet its energy needs.',
            'The digestive organs get a break.',
            'If the stores are empty, the body changes its metabolism: The next phase can begin.'
        ]
    },
    {
        id: 3,
        label: 'Fat burning',
        sublabel: 'starts after 10 h',
        triggerHours: 10,
        bodyStage: '3',
        icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
        title: 'Fat burning',
        subtitle: 'Your body begins to draw on energy from its fat stores. You have more energy again. You can support your body with gentle exercise.',
        bullets: [
            'When the body has used up the glucose from its stores, it changes its metabolism.',
            'It also releases various hormones such as testosterone and adrenaline to burn body fat from its depots.',
            'Growth hormones are increasingly released and prevent you from losing muscle while fasting.'
        ]
    },
    {
        id: 4,
        label: 'Ketosis',
        sublabel: 'begins after 12 h',
        triggerHours: 12,
        bodyStage: '4',
        icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
        title: 'Ketosis',
        subtitle: 'The body switches to the metabolic state of ketosis. Your ability to concentrate increases. You feel more alert.',
        bullets: [
            'The body produces more ketones.',
            'Ketones are fatty acid molecules that the body uses as a source of energy instead of glucose.',
            'Ketones are especially important for the brain: They provide energy, promote the repair of brain cells, and prevent diseases.'
        ]
    },
    {
        id: 5,
        label: 'Autophagy',
        sublabel: 'begins after 14 h',
        triggerHours: 14,
        bodyStage: '5',
        icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9"/></svg>`,
        title: 'Autophagy',
        subtitle: 'The body begins to regenerate itself. The efficiency of your cells increases. Your immune system is strengthened and aging processes are slowed down.',
        bullets: [
            'Autophagy is a kind of endogenous garbage disposal and natural recycling system.',
            'Damaged cells are converted into energy and disposed of and new cells are formed.',
            'The longer the fasting period, the stronger its effects.'
        ]
    }
];
