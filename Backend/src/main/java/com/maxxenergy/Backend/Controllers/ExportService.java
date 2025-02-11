package com.maxxenergy.Backend;

import com.maxxenergy.Backend.DataRecord;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

@Service
public class ExportService {

    public void exportToCsv(String fileName, List<String[]> data) throws IOException {
        try (FileWriter writer = new FileWriter(fileName)) {
            for (String[] row : data) {
                writer.write(String.join(",", row) + "\n");
            }
        }
    }

    public String exportToJson(List<DataRecord> data) {
        StringBuilder json = new StringBuilder("[\n");
        for (DataRecord record : data) {
            json.append(record.toJson()).append(",\n");
        }
        if (!data.isEmpty()) {
            json.deleteCharAt(json.lastIndexOf(","));
        }
        json.append("\n]");
        return json.toString();
    }

    public void exportToPdf(String fileName, List<DataRecord> data) {
        // Placeholder for PDF export logic
        System.out.println("Exporting data to PDF... (FileName: " + fileName + ")");
    }
}