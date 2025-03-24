=IF(OR($AX12 = "";$O12 );
    ""; 
    IF(UPPER($J12) = "DELIVERY"; 
        IF(AND($BG12 <> ""; $BG12 <> "-"; $BG12 <> "Jalur tidak ditemukan"); 
            IF($BD12; 
                "Terkirim - confirm customer"; "Delivery " & 
                IF($BF12 < -1 ; $BF12 * -1 & " hari lalu" & IF($BJ12 <> ""; " - " & $BJ12; ""); 
                    IF($BF12 = -1; "kemarin" & IF($BJ12 <> ""; " - " & $BJ12; ""); 
                        IF($BF12 = 0; "hari ini" & IF($BJ12 <> ""; " - " & $BJ12; ""); 
                            IF($BF12 = 1; "esok" & IF($BJ12 <> ""; " - " & $BJ12; "");
                                IF($BF12 = 2; "lusa" & IF($BJ12 <> ""; " - " & $BJ12; ""); "")
                            )
                        )
                    )
                )
            ); 
            IF($BJ12 <> ""; $BJ12; IF(AND(DC12 <> ""; DC12 >= 1; DC12 <> "-"); "Menunggu jalur"; if(CM12 <> ""; "Container Progress"; "-")))
        ); 
        IF(AND(UPPER($J12) = "PICK-UP"; $K12 <> ""); 
            IF(AND($BG12 <> ""; $BG12 <> "-"; $BG12 <> "Jalur tidak ditemukan"); 
                IF($BD12; 
                    IF(AND(UPPER($I12) <> "G8 - STORE"; $K12 = "G8 - STORE"); 
                        "Terkirim - cek di Store"; 
                        "Diambil - konfirmasi customer"
                    ); 
                    IF(AND(UPPER($I12) <> "G8 - STORE"; UPPER($K12) = "G8 - STORE"); 
                        IF($AB12 <> ""; "Terkirim ke Store"; "Kirim Store " &
                            IF($BF12 < -1 ; $BF12 * -1 & " hari lalu" & IF($BJ12 <> ""; " - " & $BJ12; ""); 
                                IF($BF12 = -1; "kemarin" & IF($BJ12 <> ""; " - " & $BJ12; ""); 
                                    IF($BF12 = 0; "hari ini" & IF($BJ12 <> ""; " - " & $BJ12; ""); 
                                        IF($BF12 = 1; "esok" & IF($BJ12 <> ""; " - " & $BJ12; "");
                                            IF($BF12 = 2; "lusa" & IF($BJ12 <> ""; " - " & $BJ12; ""); "")
                                        )
                                    )
                                )
                            )
                        ); 
                        "Siap diambil sesuai jalur"
                    )
                ); 
                IF($BJ12 <> ""; $BJ12; IF($AB12 <> ""; "Menunggu diambil"; IF(AND(DC12 <> ""; DC12 > 0);"Menunggu jalur"; if(CM12 <> ""; "Container Progress"; "-"))))
            ); 
            "err4"
        )
    )
)

=IF($AR6 = "";
    "";
    IF($J6 = "COMSER"
        "";
        IF($N6 = "";
            "Request date kosong";
            IF($J6 = "";
                "Pilih DO Type";
                IF($I6 = ""; 
                    "Pilih Site";
                    LET(
                        TYPE; UPPER($J6);
                        SITE; UPPER($I6);
                        PICKUP; UPPER($K6);
                        REQUEST; $N6;
                        REQUESTCHECK; $O6;
                        NOWTOREQ; $N6 - TODAY();
                        REQDATECOUNT; IF(OR(NOWTOREQ = ""; NOWTOREQ > 2); ""; IF(NOWTOREQ = 2; "Request date Lusa"; IF(NOWTOREQ = 1; "Request date Esok"; IF(NOWTOREQ = 0; "Request date Hari ini"; if(REQUESTCHECK; ""; "Lewat " & NOWTOREQ * -1 &" hari")))));
                        INSTAL; IF($P6 = ""; ""; $P6);
                        INSTALCHECK; $Q6;
                        NOWTOINSTAL; IF(INSTAL = ""; ""; $P6 - TODAY());
                        PENDING; IF($AB6 = ""; FALSE; IF(UPPER($AB6) = "DONE"; "DONE"; "OPEN"));
                        PENDINGTYPE; TRIM(LEFT(PENDING, FIND("-", PENDING) - 1));
                        JALUR; IF($BC6 = ""; ""; $BC6);
                        JALURDATE; IF($BC6 = ""; ""; DATE(VALUE(RIGHT(LEFT($BC6; FIND(" _ "; $BC6) - 1); 4)); VALUE(MID(LEFT($BC6; FIND(" _ "; $BC6) - 1); 4; 2)); VALUE(LEFT(LEFT($BC6; FIND(" _ "; $BC6) - 1); 2))));
                        JALURDONE; IF(JALUR = ""; ""; REGEXMATCH($$BC6; "(?i)done|terkirim"));
                        JALURCOUNT; IF(JALURDATE = ""; ""; JALURDATE - TODAY());
                        JALURFIX; IF(JALURDATE = ""; IF(REQDATECOUNT <> ""; "Jalur tidak ditemukan"; ""); TEXT(JALURDATE; "DDDD, dd/mm/yy") & " _ " & REGEXEXTRACT(JALUR; "_([^_]*)$"));
                        PROGRESS;
                            IF(PENDING = "DONE";
                                IF(PENDINGTYPE = "KIRIM";
                                    "Terkirim, confirm cust !?";
                                    "Sudah diambil"
                                ); 
                                IF(PENDING = "OPEN";
                                    IF(TYPE = "PICK-UP";
                                        IF(INSTAL = "";
                                            "Siap diambil, call cust !";
                                            IF(INSTALCHECK;
                                                "Terpasang. Siap diambil, call cust !";
                                                "Input instalasi. Pastikan terpasang"
                                            )
                                        );
                                        "Pending kirim. " & IF(JALURCOUNT > 0; "Ada jalur baru"; IF(JALURCOUNT = 0; "Jalur hari ini"; "Reschedule !"))
                                    );
                                    IF(JALURDONE = TRUE;
                                        IF(TYPE = "DELIVERY";
                                            "Terkirim. Confirm cust !";
                                            IF(SITE = "G8 - STORE";
                                                IF(INSTAL = "";
                                                    "Siap diambil, call cust !";
                                                    IF(INSTALCHECK;
                                                        "Terpasang. Siap diambil, call cust !";
                                                        "Input instalasi. Pastikan terpasang"
                                                    )
                                                );
                                                "Terkirim. Cek di Store"
                                            )
                                        );
                                        IF(JALURDONE = FALSE;
                                            IF(TYPE = "DELIVERY";
                                                IF(JALURCOUNT < -1 ; IF(TYPE = "DELIVERY"; "Pengantaran "; "Kirim store ") & JALURCOUNT * -1 & " hari lalu - " & IF(TYPE = "DELIVERY"; "Confirm cust! "; "Cek di store "));
                                                    IF(JALURCOUNT < -1 ; IF(TYPE = "DELIVERY"; "Pengantaran "; "Kirim store ") & "kemarin - " & IF(TYPE = "DELIVERY"; "Confirm cust! "; "Cek di store ")); 
                                                        IF(JALURCOUNT = 0;  "hari ini" & IF($BJ16 <> ""; " - " & $BJ16; ""); 
                                                            IF(JALURCOUNT = 1; "esok" & IF($BJ16 <> ""; " - " & $BJ16; "");
                                                                IF(JALURCOUNT = 2; "lusa" & IF($BJ16 <> ""; " - " & $BJ16; ""); "")
                                                            )
                                                        )
                                                    )
                                                );
                                                ""
                                            )
                                        )
                                    )                                    
                                )
                            )                        
                    )
                )
            )
        )
    )
)