import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Bell, BellOff, Globe, User, Lock, Palette } from 'lucide-react';

const Settings = () => {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [language, setLanguage] = useState('English');
    const [theme, setTheme] = useState('Default');

    const settingsSections = [
        {
            title: 'Audio Settings',
            icon: <Volume2 size={30} />,
            settings: [
                {
                    label: 'Sound Effects',
                    type: 'toggle',
                    value: soundEnabled,
                    onChange: setSoundEnabled,
                    icon: soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />
                },
                {
                    label: 'Background Music',
                    type: 'toggle',
                    value: true,
                    onChange: () => { },
                    icon: <Volume2 size={20} />
                }
            ]
        },
        {
            title: 'Notifications',
            icon: <Bell size={30} />,
            settings: [
                {
                    label: 'Game Invites',
                    type: 'toggle',
                    value: notificationsEnabled,
                    onChange: setNotificationsEnabled,
                    icon: notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />
                },
                {
                    label: 'Tournament Alerts',
                    type: 'toggle',
                    value: true,
                    onChange: () => { },
                    icon: <Bell size={20} />
                }
            ]
        },
        {
            title: 'Game Preferences',
            icon: <Palette size={30} />,
            settings: [
                {
                    label: 'Language',
                    type: 'select',
                    value: language,
                    onChange: setLanguage,
                    options: ['English', 'Spanish', 'French', 'German'],
                    icon: <Globe size={20} />
                },
                {
                    label: 'Theme',
                    type: 'select',
                    value: theme,
                    onChange: setTheme,
                    options: ['Default', 'Dark', 'Light', 'Colorful'],
                    icon: <Palette size={20} />
                }
            ]
        },
        {
            title: 'Account',
            icon: <User size={30} />,
            settings: [
                {
                    label: 'Username',
                    type: 'input',
                    value: 'Player123',
                    placeholder: 'Enter username',
                    icon: <User size={20} />
                },
                {
                    label: 'Email',
                    type: 'input',
                    value: 'player@skipbo.com',
                    placeholder: 'Enter email',
                    icon: <User size={20} />
                }
            ]
        },
        {
            title: 'Privacy & Security',
            icon: <Lock size={30} />,
            settings: [
                {
                    label: 'Profile Visibility',
                    type: 'select',
                    value: 'Public',
                    onChange: () => { },
                    options: ['Public', 'Friends Only', 'Private'],
                    icon: <Lock size={20} />
                },
                {
                    label: 'Show Online Status',
                    type: 'toggle',
                    value: true,
                    onChange: () => { },
                    icon: <Lock size={20} />
                }
            ]
        }
    ];

    return (
        <div style={{ width: '100%', position: 'relative' }}>

            {/* Floating decorative pills */}
            <div className="floating-pill" style={{
                position: 'fixed',
                top: '20%',
                left: '5%',
                width: '60px',
                height: '100px',
                background: '#FF6B6B',
                animationDelay: '0s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                bottom: '20%',
                left: '3%',
                width: '55px',
                height: '95px',
                background: '#4ECDC4',
                animationDelay: '1.5s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                top: '15%',
                right: '5%',
                width: '65px',
                height: '105px',
                background: '#FFE66D',
                animationDelay: '0.8s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                bottom: '25%',
                right: '4%',
                width: '60px',
                height: '100px',
                background: '#95E1D3',
                animationDelay: '2s',
                zIndex: 0
            }} />

            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 50%, var(--secondary-color) 50%, var(--secondary-color) 100%)',
                padding: '5rem 3rem',
                position: 'relative',
                minHeight: '350px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.5s ease'
            }}>
                <div style={{ textAlign: 'center', zIndex: 2 }}>
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1 }}
                        style={{ fontSize: '5rem', marginBottom: '1rem' }}
                    >
                        ⚙️
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            fontSize: '4.5rem',
                            fontWeight: '900',
                            color: 'white',
                            marginBottom: '1rem',
                            textShadow: '3px 3px 6px rgba(0,0,0,0.1)'
                        }}
                    >
                        Settings
                    </motion.h1>
                    <p style={{
                        fontSize: '1.4rem',
                        color: 'white',
                        maxWidth: '600px',
                        margin: '0 auto',
                        opacity: 0.95
                    }}>
                        Customize your Skip-Bo experience
                    </p>
                </div>
            </section>

            {/* Settings Sections */}
            <section style={{
                background: 'var(--bg-color)',
                padding: '4rem 3rem',
                color: 'var(--text-color)',
                transition: 'all 0.5s ease'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {settingsSections.map((section, sectionIndex) => (
                        <motion.div
                            key={sectionIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sectionIndex * 0.1 }}
                            style={{
                                background: 'var(--surface-color)',
                                borderRadius: '20px',
                                padding: '2.5rem',
                                marginBottom: '2rem',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                transition: 'all 0.5s ease',
                                color: 'var(--text-color)'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                marginBottom: '2rem',
                                color: '#FFD93D'
                            }}>
                                {section.icon}
                                <h2 style={{
                                    fontSize: '2rem',
                                    fontWeight: '800',
                                    color: 'white'
                                }}>
                                    {section.title}
                                </h2>
                            </div>

                            <div style={{
                                display: 'grid',
                                gap: '1.5rem'
                            }}>
                                {section.settings.map((setting, settingIndex) => (
                                    <div key={settingIndex} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '12px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px'
                                        }}>
                                            <div style={{ color: '#FFD93D' }}>
                                                {setting.icon}
                                            </div>
                                            <span style={{
                                                fontSize: '1.1rem',
                                                fontWeight: '600'
                                            }}>
                                                {setting.label}
                                            </span>
                                        </div>

                                        {setting.type === 'toggle' && (
                                            <div
                                                onClick={() => setting.onChange(!setting.value)}
                                                style={{
                                                    width: '60px',
                                                    height: '30px',
                                                    background: setting.value ? '#0BE881' : 'rgba(255,255,255,0.2)',
                                                    borderRadius: '15px',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.3s'
                                                }}
                                            >
                                                <div style={{
                                                    width: '26px',
                                                    height: '26px',
                                                    background: 'white',
                                                    borderRadius: '50%',
                                                    position: 'absolute',
                                                    top: '2px',
                                                    left: setting.value ? '32px' : '2px',
                                                    transition: 'left 0.3s'
                                                }} />
                                            </div>
                                        )}

                                        {setting.type === 'select' && (
                                            <select
                                                value={setting.value}
                                                onChange={(e) => setting.onChange(e.target.value)}
                                                style={{
                                                    padding: '8px 16px',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    background: 'rgba(255,255,255,0.9)',
                                                    fontSize: '1rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    color: '#2F3542'
                                                }}
                                            >
                                                {setting.options.map((option, i) => (
                                                    <option key={i} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        )}

                                        {setting.type === 'input' && (
                                            <input
                                                type="text"
                                                defaultValue={setting.value}
                                                placeholder={setting.placeholder}
                                                style={{
                                                    padding: '8px 16px',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    background: 'rgba(255,255,255,0.9)',
                                                    fontSize: '1rem',
                                                    fontWeight: '600',
                                                    color: '#2F3542',
                                                    minWidth: '250px'
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        marginTop: '3rem'
                    }}>
                        <button className="btn btn-yellow" style={{
                            fontSize: '1.1rem',
                            padding: '16px 40px'
                        }}>
                            Save Changes
                        </button>
                        <button className="btn btn-red" style={{
                            fontSize: '1.1rem',
                            padding: '16px 40px'
                        }}>
                            Reset to Default
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Settings;
