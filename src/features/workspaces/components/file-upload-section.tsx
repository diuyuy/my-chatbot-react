import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { FileText, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadFilesMutation } from "../hooks/use-upload-files-mutation";

export function FileUploadSection() {
  const [files, setFiles] = useState<File[]>([]);
  const uploadFilesMutation = useUploadFilesMutation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
      "text/markdown": [".md", ".markdown"],
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    await uploadFilesMutation.mutateAsync(files);
    setFiles([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>파일 업로드</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <Upload className="size-10 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-sm text-muted-foreground">
                파일을 여기에 드롭하세요...
              </p>
            ) : (
              <>
                <p className="text-sm font-medium">
                  파일을 드래그 앤 드롭하거나 클릭하여 선택하세요
                </p>
                <p className="text-xs text-muted-foreground">
                  .txt, .md, .pdf 파일 업로드 가능 (여러 파일 선택 가능)
                </p>
              </>
            )}
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <FileText className="size-5 text-primary" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024).toFixed(2)} KB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeFile(index)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {uploadFilesMutation.isPending && (
          <div className="flex items-center justify-center gap-2 p-3 bg-primary/10 rounded-lg">
            <Spinner className="size-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              텍스트 추출 중...
            </span>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={files.length === 0 || uploadFilesMutation.isPending}
          className="w-full"
        >
          업로드 ({files.length}개 파일)
        </Button>
      </CardContent>
    </Card>
  );
}
