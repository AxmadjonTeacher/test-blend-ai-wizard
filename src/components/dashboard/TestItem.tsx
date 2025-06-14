
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Trash } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type GeneratedTest = Database["public"]["Tables"]["generated_tests"]["Row"];

interface TestItemProps {
  test: GeneratedTest;
  onDelete: (id: string) => void;
  onDownload: (test: GeneratedTest) => void;
}

const TestItem: React.FC<TestItemProps> = ({ test, onDelete, onDownload }) => {
  return (
    <div className="glass-card p-6 rounded-lg border border-white/10">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-medium text-foreground">{test.name}</h3>
          <p className="text-muted-foreground">
            Generated on: {new Date(test.created_at).toLocaleDateString()}
          </p>
          {test.teacher_name && (
            <p className="text-muted-foreground">Teacher: {test.teacher_name}</p>
          )}
          <p className="text-muted-foreground">Questions: {test.question_count}</p>
        </div>
        <div className="flex flex-row space-x-3">
          <Button
            variant="destructive"
            className="flex items-center gap-2 liquid-button"
            onClick={() => onDelete(test.id)}
          >
            <Trash className="h-4 w-4" />
            Delete
          </Button>
          <Button 
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground liquid-button"
            onClick={() => onDownload(test)}
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestItem;
