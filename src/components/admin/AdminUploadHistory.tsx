
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Trash2, Search, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

interface UploadHistoryItem {
  id: string;
  filename: string;
  level: string;
  topic: string;
  date: string;
  questionCount: number;
}

interface AdminUploadHistoryProps {
  uploadedFiles: UploadHistoryItem[];
  onDeleteItem?: (itemId: string) => void;
  isAdmin?: boolean;
}

const AdminUploadHistory: React.FC<AdminUploadHistoryProps> = ({ 
  uploadedFiles, 
  onDeleteItem,
  isAdmin = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFiles, setFilteredFiles] = useState<UploadHistoryItem[]>(uploadedFiles);

  // Filter files when search term or uploaded files change
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFiles(uploadedFiles);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const results = uploadedFiles.filter(file => 
      file.filename.toLowerCase().includes(lowerCaseSearch) ||
      file.topic.toLowerCase().includes(lowerCaseSearch)
    );
    
    setFilteredFiles(results);
  }, [searchTerm, uploadedFiles]);

  // Group files by level
  const filesByLevel = React.useMemo(() => {
    return filteredFiles.reduce((acc: {[key: string]: UploadHistoryItem[]}, file) => {
      if (!acc[file.level]) {
        acc[file.level] = [];
      }
      acc[file.level].push(file);
      return acc;
    }, {});
  }, [filteredFiles]);

  // Get unique levels sorted
  const levels = React.useMemo(() => {
    return Object.keys(filesByLevel).sort((a, b) => {
      // Try to sort numerically if possible
      const numA = Number(a);
      const numB = Number(b);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      return a.localeCompare(b);
    });
  }, [filesByLevel]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteAttempt = (itemId: string) => {
    if (!isAdmin) {
      toast.error("You don't have permission to delete files");
      return;
    }
    
    if (onDeleteItem) {
      onDeleteItem(itemId);
    }
  };

  // Function to render files for a specific level
  const renderLevelFiles = (level: string, files: UploadHistoryItem[]) => {
    return (
      <div className="space-y-4">
        {files.map((upload) => (
          <div key={upload.id} className="flex items-center justify-between p-4 bg-white rounded-md border">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{upload.filename}</p>
                <p className="text-sm text-neutral-dark">
                  Topic: {upload.topic} | Questions: {upload.questionCount}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onDeleteItem && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleDeleteAttempt(upload.id)}
                  disabled={!isAdmin}
                  title={!isAdmin ? "Admin permission required" : "Delete file"}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
              <p className="text-sm text-neutral-dark ml-2">{upload.date}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          View all previously uploaded question files.
          {!isAdmin && (
            <div className="mt-2 flex items-center text-amber-500 text-sm">
              <ShieldAlert className="h-4 w-4 mr-1" />
              You need admin permissions to delete files
            </div>
          )}
        </CardDescription>
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by filename or topic..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredFiles.length > 0 ? (
          <Tabs defaultValue={levels.length > 0 ? levels[0] : undefined}>
            <TabsList className="mb-4">
              {levels.map(level => (
                <TabsTrigger key={level} value={level}>
                  Level {level}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {levels.map(level => (
              <TabsContent key={level} value={level}>
                {renderLevelFiles(level, filesByLevel[level])}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-8 text-neutral-dark">
            <p>
              {uploadedFiles.length > 0 
                ? "No matching files found. Try a different search term." 
                : "No files have been uploaded yet."
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUploadHistory;
