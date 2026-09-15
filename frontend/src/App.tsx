import { useState, type ReactNode } from 'react'
import { ArrowRight, BarChart3, BookOpen, BrainCircuit, Eye, EyeOff, Link2, LockKeyhole, Mail } from 'lucide-react'

function App() {
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [showPassword, setShowPassword] = useState(false)
    const [isResettingPassword, setIsResettingPassword] = useState(false)
    const [resetSent, setResetSent] = useState(false)
    const isLogin = mode === 'login'

    const goToLogin = () => {
        setMode('login')
        setIsResettingPassword(false)
        setResetSent(false)
    }

    const switchMode = (nextMode: 'login' | 'signup') => {
        setMode(nextMode)
        setIsResettingPassword(false)
        setResetSent(false)
    }

    return (
        <main className="min-h-screen overflow-hidden bg-[#111315] text-[#f3f4f6] selection:bg-[#87aeea] selection:text-[#111315]">
            <div className="grid min-h-screen lg:grid-cols-[minmax(420px,0.94fr)_minmax(520px,1.06fr)]">
                <section className="relative isolate flex min-h-[620px] flex-col overflow-hidden border-b border-white/[0.06] bg-[#111315] px-7 py-8 sm:px-16 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-[clamp(4rem,9vw,8.5rem)] lg:py-12">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_60%_58%,rgba(71,78,88,0.28),transparent_27%),linear-gradient(145deg,#111315_0%,#151719_55%,#202326_100%)]" />
                    <div className="absolute bottom-0 left-0 right-0 -z-10 h-[28%] opacity-80 [clip-path:polygon(0_57%,12%_37%,22%_52%,34%_31%,48%_56%,63%_20%,75%_48%,88%_27%,100%_52%,100%_100%,0_100%)] bg-[#0b0d0f]" />
                    <div className="absolute bottom-0 left-0 right-0 -z-10 h-[17%] [clip-path:polygon(0_62%,12%_43%,27%_64%,40%_38%,54%_69%,69%_30%,82%_58%,100%_38%,100%_100%,0_100%)] bg-[#080a0c]" />
                    <div className="absolute bottom-[17%] left-[74%] -z-10 h-28 w-28 rounded-full bg-[#626975]/30" />
                    <div className="flex items-center gap-3 text-[1.7rem] font-semibold tracking-[-0.05em] text-[#f4f5f7]"><span className="font-mono text-3xl font-bold tracking-[-0.2em]">&lt;/&gt;</span><span>Code<span className="text-[#8db2eb]">Pattern</span></span></div>
                    <p className="mt-1 hidden pl-[3.9rem] text-xs tracking-wide text-[#8d949e] sm:block">Solve. Learn. Grow.</p>
                    <div className="mt-16 max-w-lg sm:mt-20 lg:mt-24"><h1 className="max-w-md text-[clamp(2.4rem,4vw,3.65rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-[#eef0f4]">Turn your code<br />into real progress.</h1><p className="mt-5 max-w-md text-base leading-6 text-[#9aa1ab]">Track your DSA journey, discover patterns,<br className="hidden sm:block" /> get AI insights, and become a better problem solver.</p></div>
                    <div className="mt-9 grid max-w-md gap-5"><Feature icon={<BarChart3 />} title="Track Progress" detail="Streaks, stats and learning journey." /><Feature icon={<BrainCircuit />} title="AI Insights" detail="Patterns, mistakes and suggestions." /><Feature icon={<Link2 />} title="Find Connections" detail="See how problems relate." /><Feature icon={<BookOpen />} title="Learn Deeper" detail="Turn solutions into understanding." /></div>
                    <div className="mt-auto hidden pt-14 lg:block"><div className="mb-3 h-px w-6 bg-[#9da9bb]" /><p className="max-w-[190px] text-sm leading-5 text-[#a3a9b3]">“A little progress each day adds up to big results.”</p></div>
                </section>

                <section className="flex min-h-[620px] items-center justify-center bg-[#17191b] px-5 py-12 sm:px-10 lg:min-h-screen lg:px-16">
                    <div className="w-full max-w-[540px] rounded-[18px] border border-white/[0.1] bg-[#1c1e21]/90 px-6 py-9 shadow-2xl shadow-black/20 backdrop-blur sm:px-10 sm:py-11">
                        <div className="text-center"><h2 className="text-2xl font-medium tracking-[-0.03em] text-[#f1f2f4]">{isResettingPassword ? 'Reset your password' : isLogin ? 'Welcome back' : 'Create your account'}</h2><p className="mt-2 text-sm text-[#959ca6]">{isResettingPassword ? 'We will send a reset link to your email' : isLogin ? 'Continue your learning journey' : 'Start your learning journey today'}</p></div>
                        {!isResettingPassword && <div className="mt-6 grid grid-cols-2 rounded-[10px] border border-white/[0.1] bg-[#17191b] p-0.5"><button onClick={() => switchMode('login')} className={`rounded-lg py-2 text-sm transition ${isLogin ? 'bg-[#303338] text-white shadow-sm' : 'text-[#8c929b] hover:text-white'}`}>Login</button><button onClick={() => switchMode('signup')} className={`rounded-lg py-2 text-sm transition ${!isLogin ? 'bg-[#303338] text-white shadow-sm' : 'text-[#8c929b] hover:text-white'}`}>Sign Up</button></div>}

                        <form className="mt-6 space-y-5" onSubmit={(event) => { event.preventDefault(); if (isResettingPassword) setResetSent(true) }}>
                            {!isResettingPassword && !isLogin && <Field label="Name" icon={<span className="text-sm">Aa</span>} placeholder="Your name" />}
                            <Field label="Email" icon={<Mail />} placeholder="you@example.com" type="email" />
                            {isLogin && !isResettingPassword && <div><div className="mb-2 flex items-center justify-between"><label htmlFor="password" className="text-sm text-[#e0e2e6]">Password</label><button type="button" onClick={() => { setIsResettingPassword(true); setResetSent(false) }} className="text-xs text-[#8db2eb] hover:text-[#b1ccf4]">Forgot password?</button></div><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[#a1a8b2]" /><input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="h-10 w-full rounded-[9px] border border-white/[0.12] bg-[#1c1e21] pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-[#7e858f] focus:border-[#789bd1] focus:ring-2 focus:ring-[#789bd1]/20" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9da5af] hover:text-white">{showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}</button></div></div>}
                            {!isResettingPassword && !isLogin && <Field label="Password" icon={<LockKeyhole />} placeholder="Create a password" type="password" />}
                            <button type="submit" className="flex h-10 w-full items-center justify-center gap-3 rounded-[9px] bg-[#f1f2f4] text-sm font-medium text-[#202225] transition hover:bg-white active:scale-[0.99]">{isResettingPassword ? 'Send reset link' : isLogin ? 'Login' : 'Create account'}<ArrowRight className="size-[18px]" /></button>
                            {resetSent && <p className="text-center text-sm text-[#8db2eb]">Reset link sent. Check your inbox.</p>}
                        </form>

                        {!isResettingPassword && <><div className="my-6 flex items-center gap-3 text-xs text-[#7f8791]"><span className="h-px flex-1 bg-white/[0.08]" />OR<span className="h-px flex-1 bg-white/[0.08]" /></div><button className="flex h-10 w-full items-center justify-center gap-3 rounded-[9px] border border-white/[0.1] bg-[#222427] text-sm text-[#d7d9dc] transition hover:bg-[#2a2c30]"><GoogleIcon />Continue with Google</button></>}
                        <p className="mt-7 text-center text-sm text-[#8f969f]">{isResettingPassword ? 'Remembered your password?' : isLogin ? 'New here?' : 'Already have an account?'}<button onClick={() => isResettingPassword ? goToLogin() : switchMode(isLogin ? 'signup' : 'login')} className="ml-1 text-[#8db2eb] hover:text-[#b1ccf4]">{isResettingPassword ? 'Back to login' : isLogin ? 'Create an account' : 'Log in'}</button></p>
                    </div>
                </section>
            </div>
        </main>
    )
}

function Feature({ icon, title, detail }: { icon: ReactNode; title: string; detail: string }) { return <div className="flex items-center gap-5"><div className="flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.08] bg-[#272a2e] text-[#dce0e7]">{icon}</div><div><h3 className="text-sm font-medium text-[#e1e3e7]">{title}</h3><p className="mt-1 text-xs text-[#8f969f]">{detail}</p></div></div> }
function Field({ label, icon, placeholder, type = 'text' }: { label: string; icon: ReactNode; placeholder: string; type?: string }) { return <div><label className="mb-2 block text-sm text-[#e0e2e6]">{label}</label><div className="relative"><span className="pointer-events-none absolute left-3.5 top-1/2 flex -translate-y-1/2 items-center text-[#a1a8b2]">{icon}</span><input type={type} placeholder={placeholder} className="h-10 w-full rounded-[9px] border border-white/[0.12] bg-[#1c1e21] pl-11 text-sm text-white outline-none transition placeholder:text-[#7e858f] focus:border-[#789bd1] focus:ring-2 focus:ring-[#789bd1]/20" /></div></div> }
function GoogleIcon() { return <svg aria-hidden="true" className="size-[18px]" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.95h5.23a4.47 4.47 0 0 1-1.94 2.93v2.42h3.14c1.84-1.7 2.92-4.2 2.92-7.21Z" /><path fill="#34A853" d="M12 21.6c2.63 0 4.84-.87 6.45-2.36l-3.14-2.42c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.5A9.74 9.74 0 0 0 12 21.6Z" /><path fill="#FBBC05" d="M6.53 13.71a5.85 5.85 0 0 1 0-3.42V7.79H3.28a9.73 9.73 0 0 0 0 8.42l3.25-2.5Z" /><path fill="#EA4335" d="M12 6.26c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.38 14.63 2.4 12 2.4a9.74 9.74 0 0 0-8.72 5.39l3.25 2.5c1.01-1.97 3.17-3.69 5.72-3.69Z" /></svg> }

export default App
