                                                                

self.addEventListener('instal', function (param) {
    alert('sw instaled')
})



=IF($C4 = "";
    "" ;
    IF(AL4 = "DONE";
        "ONCUSTOMER";
        IF(AL4 = "TERKIRIM";
            "ON CUSTOMER";
            IF($M4;
                "ON CUSTOMER";
                IF($AG4 = "UN FULFILLMENT";
                    "READY STORE" ;
                    IF($T4 = "NDC";
                        IF($BB4 > 0;
                            "READY SDC";
                            IF($BB4 = 0;
                                "UNLOADING";
                                IF($S4 = "-";
                                    "NDC PREPARE";
                                    $S4
                                ) 
                            ));
                        IF($G4 = "STORE";
                            "STORE PREPARE";
                            "SDC PREPARE" 
                        )
                    )
                )
            )
        )
    )
)   


























=IF(C4 = ""; 
    "";
    IF(AL4 = "LUSA";
        "LUSA";
        IF (AL4 = "TOMMOROW";
            "TOMMOROW";
            IF(AL4 = "DONE";
                H4 &" DONE";
                
                IF(M4; 
                    H4&" DONE";
                    IF(AG4 = "FULFILLMENT";
                        H4&" DONE";
                        IF(X4 > 0; 
                            H4&" PENDING"; 
                            IF(X4 = 0; 
                                "ON "&H4; 
                                IF(X4 = -1;
                                    "TOMMOROW";
                                    "-"
                                )
                            )
                        )
                    )
                )
            )

            
        )
    )
)



=IF($C20 = "";
    "" ;
    IF($M20;
        "ON CUSTOMER";
        IF($AI20 = "UN FULFILLMENT";
            "READY STORE" ;
            IF($T20 = "NDC";
                IF($BH20 > 0;
                    "READY SDC";
                    IF($BH20 = 0;
                        "UNLOADING";
                        IF($S20 = "-";
                            "NDC PREPARE";
                            $S20
                        ) 
                    ));
                IF($G20 = "STORE";
                    "STORE PREPARE";
                    "SDC PREPARE" 
                )
            )
        )
    )
)  


=IF(E6 = ""; ""; DATE(VALUE(MID(E6;FIND("."; E6; FIND("."; E6)+1)+1;4)); VALUE(MID(E6;FIND("."; E6; FIND("."; E6)+1)+5;2)); VALUE(MID(E6; FIND("."; E6; FIND("."; E6)+1)+7;2))))











=IF(AQ6 = "";
    "";
    IF(AW6 = "-";
        IF(AX6 = "-";
            IF(AY6 = "-";
                FALSE;
                AY6
            );
            AX6
        );
        AW6       
    )
)


=IF(AQ6 = "";
    "";
    IF(AW6 = "-";
        IF(AX6 = "-";
            IF(AY6 = "-";
                "-";
                2
            );
            1
        );
        0
    )
)

=IF(AP6 = "";
    "";
    IF(AZ6 = "-";
        IF(AT6 > 0;
            J6&" PENDING - "&AT6&" HARI";
            IF(AT6 = 0;
                "ON "&J6;
                IF(AT6 = -1;
                    "BESOK";
                    IF(AT6 = -2;
                        "LUSA";
                        "-"
                    )
                )
            )
        );
        IF(BA6 = 0;
            "ON DELIVERY  - "&AV6;
            IF(BA6 = 1;
                "BESOK - "&AV6;
                IF(BA6 = 2;
                    "LUSA - "&AV6;
                    "-"
                )
            )
        )
    )
)




=IF(AP6 = "";
    "";
    IF(AT6 > 0;
        J6&" PENDING - "&AT6&" HARI";
        IF(AT6 = 0;
            "ON "&J6;
            IF(AT6 = -1;
                "BESOK";
                IF(AT6 = -2;
                    "LUSA";
                    "-"
                )
            )
        )
    )
)


=IF(J6 = ""; 
    "";
    IF(P6 = "";
        "";
        QUERY(
            instalHariIni!A5:AJ;
            "SELECT Col"
        )   
    )
)



=IF(P6 = "";
    "";
    IF(J6 = "";
        "";
        IF(BK6 = "ON WORK";
            IF(J6 = "CUCI-AC";
                IFNA(
                    XLOOKUP(
                        BI6;
                        instalHariIni!$B$5:$B;
                        instalHariIni!$W$5:$W;
                        FALSE
                    );
                    "TIDAK DITEMUKAN"
                );
                IFNA(
                    XLOOKUP(
                        BI6;
                        instalHariIni!$B$5:$B$1000;
                        instalHariIni!$N$5:$N;
                        FALSE
                    );
                    "TIDAK DITEMUKAN"
                )
            );
            IF(BK6 = "BESOK";
                IF(J6 = "CUCI-AC";
                    IFNA(XLOOKUP(BJ6; instalBesok!$B$5:$B; instalBesok!$W$5:$W; FALSE); "TIDAK DITEMUKAN");
                    IFNA(XLOOKUP(BJ6; instalBesok!$B$5:$B; instalBesok!$N$5:$N; FALSE); "TIDAK DITEMUKAN")
                );
                ""
            )
        )
    )
)