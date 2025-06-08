import React from "react";
import {
  Card,
  Button,
  Progress,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Link,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useBulkImport } from "../hooks/useBulkImport";
import { CsvParserAdapter } from "@/infrastructure/adapters/product/CsvParserAdapter";

export const ImportCSV: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [previewData, setPreviewData] = React.useState<string[][]>([]);
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);

  const mutation = useBulkImport();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target?.result as string;
        const lines = csvData.split("\n").filter((line) => line.trim() !== "");
        const parsedData = lines.slice(0, 6).map((line) => line.split(","));
        setPreviewData(parsedData);

        const sampleErrors: string[] = [];
        if (parsedData[0].length < 4) {
          sampleErrors.push(
            "El archivo CSV no tiene todas las columnas requeridas."
          );
        }
        if (parsedData.length < 2) {
          sampleErrors.push(
            "El archivo CSV está vacío o no contiene datos de productos."
          );
        }
        setErrorMessages(sampleErrors);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target?.result as string;
      const dto = CsvParserAdapter.parse(csvText);
      mutation.mutate(dto, {
        onSettled: () => {
          setIsUploading(false);
          setUploadProgress(100);
        },
      });
    };
    reader.readAsText(file);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
        }
        return next;
      });
    }, 300);
  };

  const downloadTemplate = () => {
    console.log("Downloading template...");
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">Importar Productos desde CSV</h3>
          <p className="text-default-500">
            Sube un archivo CSV con tus productos para importarlos masivamente a tu catálogo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card className="border-2 border-dashed p-6 text-center border-default-200">
              {file ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Icon icon="lucide:file-text" width={40} height={40} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-default-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      onPress={() => {
                        setFile(null);
                        setPreviewData([]);
                        setErrorMessages([]);
                      }}
                    >
                      Eliminar
                    </Button>
                    <Button
                      size="sm"
                      color="primary"
                      isDisabled={isUploading || errorMessages.length > 0}
                      isLoading={isUploading}
                      onPress={handleUpload}
                    >
                      {isUploading ? "Importando..." : "Importar Productos"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Icon icon="lucide:upload-cloud" width={48} height={48} className="text-default-400" />
                  </div>
                  <div>
                    <p className="text-default-500">Arrastra tu archivo CSV aquí o</p>
                    <label className="cursor-pointer text-primary hover:underline">
                      <span>selecciona un archivo</span>
                      <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                  <p className="text-xs text-default-400">Solo archivos CSV (máx. 5MB)</p>
                </div>
              )}
            </Card>

            <div className="flex justify-between items-center">
              <p className="text-sm text-default-500">¿No tienes un archivo CSV?</p>
              <Button
                size="sm"
                variant="flat"
                color="primary"
                startContent={<Icon icon="lucide:download" width={16} height={16} />}
                onPress={downloadTemplate}
              >
                Descargar Plantilla
              </Button>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm">Progreso de importación</p>
                  <p className="text-sm">{uploadProgress}%</p>
                </div>
                <Progress value={uploadProgress} color="primary" aria-label="Progreso de importación" className="h-2" />
              </div>
            )}

            {errorMessages.length > 0 && (
              <div className="bg-danger-50 text-danger p-3 rounded-md">
                <p className="font-medium mb-2">Errores encontrados:</p>
                <ul className="list-disc pl-5 text-sm">
                  {errorMessages.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-medium font-medium">Vista previa</h4>
              <Chip size="sm" variant="flat" color="primary">
                Primeras 5 filas
              </Chip>
            </div>

            {previewData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table removeWrapper aria-label="Vista previa de CSV" className="min-w-full">
                  <TableHeader>
                    {previewData[0].map((header, index) => (
                      <TableColumn key={index}>{header}</TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {previewData.slice(1, 6).map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="border rounded-md p-6 text-center text-default-400">
                <p>Sube un archivo CSV para ver la vista previa</p>
              </div>
            )}

            <div className="bg-default-50 p-4 rounded-md">
              <h5 className="font-medium mb-2">Formato requerido</h5>
              <p className="text-sm text-default-600 mb-3">
                Tu archivo CSV debe incluir las siguientes columnas:
              </p>
              <ul className="text-sm space-y-1 text-default-600">
                <li className="flex items-center gap-1">
                  <Icon icon="lucide:check" className="text-success" width={16} height={16} />
                  <span>nombre (obligatorio)</span>
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="lucide:check" className="text-success" width={16} height={16} />
                  <span>precio (obligatorio)</span>
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="lucide:check" className="text-success" width={16} height={16} />
                  <span>stock (obligatorio)</span>
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="lucide:check" className="text-success" width={16} height={16} />
                  <span>categoria (obligatorio)</span>
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="lucide:minus" className="text-default-400" width={16} height={16} />
                  <span>descripcion (opcional)</span>
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="lucide:minus" className="text-default-400" width={16} height={16} />
                  <span>sku (opcional)</span>
                </li>
              </ul>
              <div className="mt-3">
                <Link href="#" size="sm" color="primary">
                  Ver documentación completa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
