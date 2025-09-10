import type { Extension } from '../types';

export const approvedExtensions: Extension[] = [
    {
        id: 'cjpalhdlnbpafiamejdnhcphjbkeiagm',
        name: 'uBlock Origin',
        category: 'Privacy & Security',
        rating: 4.6,
        description: 'An efficient wide-spectrum content blocker',
        functionality: 'Blocks ads, trackers, and malware domains',
        useCase: 'Privacy protection and ad blocking',
        users: 10000000,
        lastUpdated: '2024-03-15'
    },
    {
        id: 'nngceckbapebfimnlniiiahkandclblb',
        name: 'Bitwarden',
        category: 'Privacy & Security',
        rating: 4.7,
        description: 'Free password manager',
        functionality: 'Securely store and autofill passwords',
        useCase: 'Password management and security',
        users: 5000000,
        lastUpdated: '2024-03-10'
    },
    {
        id: 'fmkadmapgofadopljbjfkapdkoienihi',
        name: 'React Developer Tools',
        category: 'Developer Tools',
        rating: 4.5,
        description: 'Debug React component hierarchies',
        functionality: 'Inspect React components and state',
        useCase: 'React application development and debugging',
        users: 3000000,
        lastUpdated: '2024-03-12'
    },
    {
        id: 'bmnlcjabgnpnenekpadlanbbkooimhnj',
        name: 'Honey',
        category: 'Shopping',
        rating: 4.2,
        description: 'Automatically apply coupon codes',
        functionality: 'Find and apply discount codes at checkout',
        useCase: 'Online shopping savings',
        users: 17000000,
        lastUpdated: '2024-03-08'
    },
    {
        id: 'eimadpbcbfnmbkopoojfekhnkhdbieeh',
        name: 'Dark Reader',
        category: 'Accessibility',
        rating: 4.5,
        description: 'Dark mode for every website',
        functionality: 'Applies dark theme to web pages',
        useCase: 'Reduce eye strain and improve readability',
        users: 5000000,
        lastUpdated: '2024-03-14'
    }
];

export const blockedExtensions: Extension[] = [
    {
        id: 'malicious123456789',
        name: 'Free VPN Super Fast',
        category: 'Privacy & Security',
        rating: 2.1,
        description: 'Suspicious VPN extension with data harvesting',
        functionality: 'VPN service with hidden data collection',
        useCase: 'VPN access (flagged for security concerns)',
        users: 100000,
        lastUpdated: '2023-12-01'
    },
    {
        id: 'adware987654321',
        name: 'Download Helper Pro',
        category: 'Productivity',
        rating: 1.8,
        description: 'Download manager with embedded adware',
        functionality: 'File downloading with malicious ads',
        useCase: 'File downloading (contains malware)',
        users: 50000,
        lastUpdated: '2023-11-15'
    },
    {
        id: 'phishing456789123',
        name: 'Banking Security Plus',
        category: 'Privacy & Security',
        rating: 1.5,
        description: 'Fake banking security extension',
        functionality: 'Claims to secure banking (steals credentials)',
        useCase: 'Banking security (phishing attempt)',
        users: 25000,
        lastUpdated: '2023-10-30'
    },
    {
        id: 'cryptominer456123',
        name: 'CPU Optimizer Pro',
        category: 'Productivity',
        rating: 1.2,
        description: 'Hidden cryptocurrency miner',
        functionality: 'Claims to optimize CPU (mines crypto)',
        useCase: 'System optimization (cryptomining malware)',
        users: 75000,
        lastUpdated: '2023-09-20'
    },
    {
        id: 'spyware789123456',
        name: 'Privacy Guard Elite',
        category: 'Privacy & Security',
        rating: 2.0,
        description: 'Spyware disguised as privacy tool',
        functionality: 'Claims privacy protection (spies on users)',
        useCase: 'Privacy protection (spyware)',
        users: 80000,
        lastUpdated: '2023-08-15'
    },
    {
        id: 'keylogger123789',
        name: 'Typing Assistant',
        category: 'Productivity',
        rating: 1.9,
        description: 'Keylogger disguised as typing helper',
        functionality: 'Claims to help typing (logs keystrokes)',
        useCase: 'Typing assistance (keylogger malware)',
        users: 45000,
        lastUpdated: '2023-07-10'
    },
    {
        id: 'adspam987321',
        name: 'Web Enhancer Plus',
        category: 'Productivity',
        rating: 1.6,
        description: 'Aggressive ad injection extension',
        functionality: 'Claims to enhance browsing (injects ads)',
        useCase: 'Web enhancement (adware)',
        users: 120000,
        lastUpdated: '2023-06-25'
    },
    {
        id: 'redirect654321',
        name: 'Search Optimizer',
        category: 'Productivity',
        rating: 1.4,
        description: 'Search hijacker extension',
        functionality: 'Claims to optimize search (redirects queries)',
        useCase: 'Search optimization (browser hijacker)',
        users: 90000,
        lastUpdated: '2023-05-30'
    },
    {
        id: 'datastealer456',
        name: 'Form Filler Pro',
        category: 'Productivity',
        rating: 1.7,
        description: 'Data harvesting form filler',
        functionality: 'Claims to fill forms (steals form data)',
        useCase: 'Form filling (data theft)',
        users: 65000,
        lastUpdated: '2023-04-18'
    },
    {
        id: 'malvertising123',
        name: 'Deal Finder Supreme',
        category: 'Shopping',
        rating: 1.3,
        description: 'Malvertising extension',
        functionality: 'Claims to find deals (shows malicious ads)',
        useCase: 'Deal finding (malvertising)',
        users: 110000,
        lastUpdated: '2023-03-22'
    }
];

export const rejectedExtensions: Extension[] = [
    {
        id: 'gaming123456789',
        name: 'Ultimate Game Cheats',
        category: 'Entertainment',
        rating: 3.2,
        description: 'Game cheating tools',
        functionality: 'Provides cheats for online games',
        useCase: 'Gaming assistance (violates game terms)',
        users: 200000,
        lastUpdated: '2024-01-20'
    },
    {
        id: 'proxy987654321',
        name: 'Anonymous Web Proxy',
        category: 'Privacy & Security',
        rating: 2.8,
        description: 'Web proxy for accessing blocked sites',
        functionality: 'Bypasses network restrictions',
        useCase: 'Access blocked websites (policy violation)',
        users: 300000,
        lastUpdated: '2024-02-10'
    }
];

export const getExtensionStatus = (extensionId: string): 'approved' | 'blocked' | 'rejected' | 'unknown' => {
    if (approvedExtensions.some(ext => ext.id === extensionId)) return 'approved';
    if (blockedExtensions.some(ext => ext.id === extensionId)) return 'blocked';
    if (rejectedExtensions.some(ext => ext.id === extensionId)) return 'rejected';
    return 'unknown';
};

export const findExtensionById = (extensionId: string): Extension | undefined => {
    return [...approvedExtensions, ...blockedExtensions, ...rejectedExtensions]
        .find(ext => ext.id === extensionId);
};
