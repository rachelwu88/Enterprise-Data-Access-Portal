package com.maxxenergy.Backend.Controllers;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/data")
public class DataController {

    private static final Logger logger = Logger.getLogger(String.valueOf(DataController.class));
    private final JdbcTemplate jdbcTemplate;

    //Database injection
    public DataController(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    //Endpoint to fetch all data
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Map<String, Object>> getAllData(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size){
        logger.info("Fetching all plant generation data (page={}, size={})");

        int offset = page * size;
//        String query = "SELECT plantgdata.Date, plantgdata.PLANT_ID, plantgdata.DC_POWER, plantgdata.AC_POWER, plantgdata.DAILY_YIELD, plantgdata.TOTAL_YIELD,\n" +
//                "weather_test.temp AS temperature, weather_test.humidity, weather_test.precip, weather_test.windgust, weather_test.solarenergy\n" +
//                "FROM plant_generation_data.plantgdata\n" +
//                "JOIN weather_test ON DATE(plantgdata.DATE) = DATE(weather_test.datetime) LIMIT ? OFFSET ?;";
        String query = "SELECT * FROM plant_generation_data.plantgdata LIMIT ? OFFSET ?;";
        return jdbcTemplate.queryForList(query, size, offset);
    }

    //Get data by plant ID
    @GetMapping("/by-plant-id")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getDataByPlantId(@RequestParam int plantId, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size){
        logger.info("Fetching data for Plant ID: {}");

        int offset = (page - 1) * size;
//        String query = "SELECT plantgdata.Date, plantgdata.PLANT_ID, plantgdata.DC_POWER, plantgdata.AC_POWER,\n" +
//                "plantgdata.DAILY_YIELD, plantgdata.TOTAL_YIELD, weather_test.temp AS temperature,\n" +
//                "weather_test.humidity, weather_test.precip, weather_test.windgust, weather_test.solarenergy,\n" +
//                "NOW() AS timestamp, 'valid' AS data_quality\n" +
//                "FROM plant_generation_data.plantgdata \n" +
//                "JOIN weather_test ON Date(plantgdata.Date) = DATE(weather_test.datetime)\n" +
//                "WHERE PLANT_ID = ? LIMIT ? OFFSET ?;";
        String query = "SELECT * FROM plant_generation_data.plantgdata WHERE plant_id = ? LIMIT ? OFFSET ?;";
        return jdbcTemplate.queryForList(query, plantId, size, offset);
    }

    //Get data by date range
    @GetMapping("/by-date")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getDataByDateRange(@RequestParam String startDate, @RequestParam String endDate,
    @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size){
        logger.info("Fetching data from {} to {}");

        int offset = (page - 1) * size;
//        String query = "SELECT plantgdata.DATE, plantgdata.PLANT_ID, plantgdata.DC_POWER, plantgdata.AC_POWER,\n" +
//                "plantgdata.DAILY_YIELD, plantgdata.TOTAL_YIELD, weather_test.temp AS temperature, \n" +
//                "weather_test.humidity, weather_test.precip, weather_test.windgust, weather_test.solarenergy,\n" +
//                "NOW() AS timestamp, 'valid' AS data_quality\n" +
//                "FROM plant_generation_data.plantgdata \n" +
//                "JOIN weather_test ON DATE(plantgdata.DATE) = DATE(weather_test.datetime)\n" +
//                "WHERE DATE(Date) BETWEEN ? AND ? LIMIT ? OFFSET ?;";
        String query = "SELECT * FROM plant_generation_data.plantgdata WHERE DATE BETWEEN ? AND ? LIMIT ? OFFSET ?";
        return jdbcTemplate.queryForList(query, startDate, endDate, size, offset);
    }

    //Get data with DC_POWER greater than specified value
    @GetMapping("/by-dc-power")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getDataByDcPower (@RequestParam int dcPower, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size){
        logger.info("Fetching data where DC Power > {}");

        int offset = (page - 1) * size;
//        String query = "SELECT plantgdata.DATE, plantgdata.PLANT_ID, plantgdata.DC_POWER, plantgdata.AC_POWER,\n" +
//                "plantgdata.DAILY_YIELD, plantgdata.TOTAL_YIELD, weather_test.temp AS temperature,\n" +
//                "weather_test.humidity, weather_test.precip, weather_test.windgust, weather_test.solarenergy,\n" +
//                "NOW() AS timestamp, 'valid' AS data_quality\n" +
//                "FROM plant_generation_data.plantgdata \n" +
//                "JOIN weather_test ON DATE(plantgdata.DATE) = DATE(weather_test.datetime)\n" +
//                "WHERE DC_POWER > ? LIMIT ? OFFSET ?;";
        String query = "SELECT * FROM plant_generation_data.plantgdata WHERE DC_POWER > ? LIMIT ? OFFSET ?;";
        return jdbcTemplate.queryForList(query,dcPower, size, offset);
    }

    //Get data by specific plant ID and date range
    @GetMapping("/by-plant-id-date-range")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getDataByPlantIdAndDate(@RequestParam int plantId, @RequestParam String startDate, @RequestParam String endDate,
                                                             @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size){
        logger.info("Fetching data for Plant ID: {} between {} and {}");

        int offset = (page - 1) * size;
//        String query ="SELECT plantgdata.DATE, plantgdata.PLANT_ID, plantgdata.DC_POWER, plantgdata.AC_POWER,\n" +
//                "plantgdata.DAILY_YIELD, plantgdata.TOTAL_YIELD, weather_test.temp AS temperature,\n" +
//                "weather_test.humidity, weather_test.precip, weather_test.windgust, weather_test.solarenergy,\n" +
//                "NOW() AS timestamp, 'valid' AS data_quality\n" +
//                "FROM plant_generation_data.plantgdata\n" +
//                "JOIN weather_test ON DATE(plantgdata.DATE) = DATE(weather_test.datetime)\n" +
//                "WHERE PLANT_ID = ? AND DATE(Date) BETWEEN ? AND ? LIMIT ? OFFSET ?;";
        String query = "SELECT * FROM plant_generation_data.plantgdata WHERE PLANT_ID = ? AND DATE(Date) BETWEEN ? AND ? LIMIT ? OFFSET ?;";
        return jdbcTemplate.queryForList(query, plantId, startDate,endDate, size, offset);
    }

    //Get average AC_POWER for a specific plant
    @GetMapping("/average-ac-power")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getAverageAcPowerByPlantId(@RequestParam int plantId){
        logger.info("Fetching average AC Power for Plant ID: {}" + plantId);
        String query = "SELECT AVG(AC_POWER) as avgAcPower FROM plant_generation_data.plantgdata WHERE PLANT_ID = ?;";
            return jdbcTemplate.queryForList(query, plantId);
    }

    //Get total daily yield for specific plant
    @GetMapping("/total-daily-yield")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getTotalDailyYieldByPlantId(@RequestParam int plantId){
        logger.info("Fetching total daily yield for Plant ID: {}" + plantId);
        String query = "SELECT sum(DAILY_YIELD) as totalDailyYield FROM plant_generation_data.plantgdata WHERE PLANT_ID = ?;";
        return jdbcTemplate.queryForList(query, plantId);
    }
}
