import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, Clock, FileText, ArrowRight } from 'lucide-react';
import { NotificationItem } from '../../types';

interface ScreenNotificationsProps {
  notifications: NotificationItem[];
  onNavigate: (tab: string) => void;
  isWireframeMode?: boolean;
}

export const ScreenNotifications: React.FC<ScreenNotificationsProps> = ({
  notifications,
  onNavigate,
  isWireframeMode = false
}) => {
  return (
    <div className={`space-y-4 pb-20 ${isWireframeMode ? 'font-mono' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-neutral-900 leading-tight">Notification Center</h2>
          <p className="text-[11px] text-neutral-500">Cycle alerts, compliance notices & confirmations</p>
        </div>
        <button 
          onClick={() => alert('All notifications marked as read')}
          className="text-xs text-neutral-500 hover:text-neutral-900 font-medium"
        >
          Mark all read
        </button>
      </div>

      {/* 48-Hour Grace Alert Banner */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="font-bold text-sm">48-Hour Grace Notice Trigger</div>
          <p className="text-[11px] text-amber-800 mt-0.5">
            Pre-session academic enrollment updates are required 48 hours prior to term start to avoid the 5% late penalty fine.
          </p>
          <button
            onClick={() => onNavigate('lifecycle_protocols')}
            className="mt-2 text-xs font-semibold text-amber-900 underline flex items-center gap-1"
          >
            Review Non-Compliance Timeline <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-2.5">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-2xl border transition-colors flex items-start gap-3 text-xs ${
              item.isRead 
                ? 'bg-white border-neutral-200/80 text-neutral-700' 
                : 'bg-emerald-50/50 border-emerald-200 text-neutral-900 shadow-xs'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
              item.type === 'payment'
                ? 'bg-emerald-100 text-emerald-800'
                : item.type === 'milestone'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-neutral-100 text-neutral-700'
            }`}>
              {item.type === 'payment' && <CheckCircle2 className="w-4 h-4" />}
              {item.type === 'milestone' && <Clock className="w-4 h-4" />}
              {item.type === 'report' && <FileText className="w-4 h-4" />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-neutral-900 text-xs">{item.title}</h4>
                <span className="text-[10px] text-neutral-400 font-mono-tabular">{item.timestamp}</span>
              </div>
              <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
