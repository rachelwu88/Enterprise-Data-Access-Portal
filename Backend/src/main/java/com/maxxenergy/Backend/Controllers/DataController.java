package com.maxxenergy.Backend.Controllers;

import org.springframework.jdbc.core.JdbcTemplate;
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
    @GetMapping("/data")
//    @PreAuthorize("hasRole('ADMIN')")
    public List<Map<String, Object>> getAllData(){
        logger.info("Fetching all plant generation data");
        String query = "SELECT * FROM plant_generation_data.plantgdata;";
        return jdbcTemplate.queryForList(query);
    }

    //Get data by plant ID
    @GetMapping("/data")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getDataByPlantId(@RequestParam int plantId){
        logger.info("Fetching data for Plant ID: {}");
        String query = "SELECT * FROM plant_generation_data.plantgdata WHERE PLANT_ID = ?;";
        return jdbcTemplate.queryForList(query, plantId);
    }

    //Get data by date range
    @GetMapping("/data")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getDataByDateRange(@RequestParam String startDate, @RequestParam String endDate){
        logger.info("Fetching data from {} to {}");
        String query = "SELECT * FROM plant_generation_data.plantgdata WHERE DATE(Date) BETWEEN ? AND ?;";
        return jdbcTemplate.queryForList(query, startDate, endDate);
    }

    //Get data with DC_POWER greater than specified value
    @GetMapping("/data")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getDataByDcPower (@RequestParam int dcPower){
        logger.info("Fetching data where DC Power > {}");
        String query = "SELECT * FROM plant_generation_data.plantgdata WHERE DC_POWER > ?;";
        return jdbcTemplate.queryForList(query,dcPower);
    }

    //Get data by specific plant ID and date range
    @GetMapping("/data")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getDataByPlantIdAndDate(@RequestParam int plantId, @RequestParam String startDate, @RequestParam String endDate){
        logger.info("Fetching data for Plant ID: {} between {} and {}");
        String query ="SELECT * FROM plant_generation_data.plantgdata WHERE PLANT_ID = ? AND DATE(Date) BETWEEN ? AND ?;";
        return jdbcTemplate.queryForList(query, plantId, startDate,endDate);
    }

    //Get average AC_POWER for a specific plant
    @GetMapping("/data")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getAverageAcPowerByPlantId(@RequestParam int plantId){
        logger.info("Fetching average AC Power for Plant ID: {}");
        String query = "SELECT AVG(AC_POWER) as avgAcPower FROM plant_generation_data.plantgdata WHERE PLANT_ID = ?;";
            return jdbcTemplate.queryForList(query, plantId);
    }

    //Get total daily yield for specific plant
    @GetMapping("/data")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getTotalDailyYieldByPlantId(@RequestParam int plantId){
        logger.info("Fetching total daily yield for Plant ID: {}");
        String query = "SELECT sum(DAILY_YIELD) as totalDailyYield FROM plant_generation_data.plantgdata WHERE PLANT_ID = ?;";
        return jdbcTemplate.queryForList(query, plantId);
    }
}
