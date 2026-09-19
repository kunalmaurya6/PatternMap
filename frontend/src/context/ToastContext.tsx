import React, { createContext, useContext, useState, useCallback } from 'react'
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
  id: string
  type: ToastType
  title?: string
  message: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, 'id'>) => void
  success: (message: string, title?: string) => void
  error: (message: string, title?: string) => void
  warning: (message: string, title?: string) => void
  info: (message: string, title?: string) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const showToast = useCallback(
    ({ type, title, message, duration = 4500 }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
      const newToast: ToastItem = { id, type, title, message, duration }

      setToasts((prev) => [...prev, newToast])

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id)
        }, duration)
      }
    },
    [dismissToast]
  )

  const success = useCallback(
    (message: string, title?: string) => showToast({ type: 'success', title, message }),
    [showToast]
  )

  const error = useCallback(
    (message: string, title?: string) => showToast({ type: 'error', title, message }),
    [showToast]
  )

  const warning = useCallback(
    (message: string, title?: string) => showToast({ type: 'warning', title, message }),
    [showToast]
  )

  const info = useCallback(
    (message: string, title?: string) => showToast({ type: 'info', title, message }),
    [showToast]
  )

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const ToastContainer: React.FC<{
  toasts: ToastItem[]
  onDismiss: (id: string) => void
}> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null

  return (
    <div
      aria-live="assertive"
      className="fixed top-4 right-4 z-50 flex w-full max-w-sm flex-col gap-3 pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  )
}

const ToastCard: React.FC<{
  toast: ToastItem
  onDismiss: () => void
}> = ({ toast, onDismiss }) => {
  const { type, title, message } = toast

  const styles = {
    error: {
      border: 'border-red-500/30',
      bg: 'bg-[#1e1719]/95',
      iconBg: 'bg-red-500/15',
      iconColor: 'text-red-400',
      titleColor: 'text-red-200',
      icon: <AlertCircle className="size-5 shrink-0 text-red-400" />,
    },
    success: {
      border: 'border-emerald-500/30',
      bg: 'bg-[#141d18]/95',
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-400',
      titleColor: 'text-emerald-200',
      icon: <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />,
    },
    warning: {
      border: 'border-amber-500/30',
      bg: 'bg-[#1e1a14]/95',
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-400',
      titleColor: 'text-amber-200',
      icon: <AlertTriangle className="size-5 shrink-0 text-amber-400" />,
    },
    info: {
      border: 'border-sky-500/30',
      bg: 'bg-[#141a22]/95',
      iconBg: 'bg-sky-500/15',
      iconColor: 'text-sky-400',
      titleColor: 'text-sky-200',
      icon: <Info className="size-5 shrink-0 text-sky-400" />,
    },
  }[type]

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex items-start gap-3 rounded-xl border ${styles.border} ${styles.bg} p-4 shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-2`}
    >
      <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${styles.iconBg}`}>
        {styles.icon}
      </div>

      <div className="flex-1 pt-0.5">
        {title && (
          <h4 className={`text-sm font-semibold tracking-tight ${styles.titleColor}`}>
            {title}
          </h4>
        )}
        <p className="mt-0.5 text-xs leading-relaxed text-[#c4c9d1]">
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="text-[#848c99] hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-md"
        aria-label="Close notification"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
