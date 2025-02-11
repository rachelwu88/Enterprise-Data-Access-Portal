package com.maxxenergy.Backend.Controllers;

import com.maxxenergy.Backend.ExportService;
import com.maxxenergy.Backend.DataRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    @Autowired
    private ExportService exportService;

    @GetMapping("/csv")
    public String exportCsv() {
        List<DataRecord> data = generateSampleData();
        List<String[]> csvData = new ArrayList<>();
        for (DataRecord record : data) {
            csvData.add(record.toCsvRow());
        }

        try {
            exportService.exportToCsv("exported-data.csv", csvData);
            return "Data exported to CSV successfully!";
        } catch (IOException e) {
            return "Failed to export data to CSV: " + e.getMessage();
        }
    }

    @GetMapping("/json")
    public String exportJson() {
        List<DataRecord> data = generateSampleData();
        return exportService.exportToJson(data);
    }

    @GetMapping("/pdf")
    public String exportPdf() {
        List<DataRecord> data = generateSampleData();
        exportService.exportToPdf("exported-data.pdf", data);
        return "Data exported to PDF successfully!";
    }

    private List<DataRecord> generateSampleData() {
        List<DataRecord> data = new ArrayList<>();
        data.add(new DataRecord("2025-02-10 10:00", "500kW", "95%"));
        data.add(new DataRecord("2025-02-10 11:00", "520kW", "97%"));
        data.add(new DataRecord("2025-02-10 12:00", "510kW", "96%"));
        return data;
    }
}
