import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AboutUsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  answer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
}

const AboutUsPopup: React.FC<AboutUsPopupProps> = ({
  isOpen,
  onClose,
  question,
  answer,
  onAnswerChange,
  onSubmit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Answer the question to proceed</DialogTitle>
          <DialogDescription>{question}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            type="text"
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Your answer..."
            className="w-full"
          />
        </div>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AboutUsPopup;