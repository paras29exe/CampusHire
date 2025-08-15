'use client';

import { useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

export function PasswordRevealModal({ open, onClose, password }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(String(password));
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset after 3s
    } catch {
      setCopied(false);
    }
  }, [password]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogTitle className="text-red-600">Here is generated Password for the added User </DialogTitle>
        <p className="text-sm text-gray-700">
          This password is shown <strong>only once</strong>. Please copy or screenshot it now.
        </p>

        <div className="bg-gray-100 rounded-md px-4 py-2 mt-4 flex items-center justify-between">
          <span className="font-mono text-lg">{password}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="hover:bg-transparent"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600" />
            )}
          </Button>
        </div>

        {copied && (
          <p className="text-green-600 text-sm mt-2 text-right">
            Copied to clipboard!
          </p>
        )}

        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>I have copied it</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
