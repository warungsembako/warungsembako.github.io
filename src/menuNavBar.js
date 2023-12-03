import { mdiAccount, mdiLogout, mdiThemeLightDark } from '@mdi/js'

export default [
    {
        icon: mdiThemeLightDark,
        label: 'Light/Dark',
        isDesktopNoLabel: true,
        isToggleLightDark: true,
    },
    {
        isCurrentUser: true,
        menu: [
            {
                icon: mdiAccount,
                label: 'My Profile',
                to: '/profile',
            },
            {
                isDivider: true,
            },
            {
                icon: mdiLogout,
                label: 'Log Out',
                isLogout: true,
            },
        ],
    },
]
